import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16' // Use the version compatible with your installed Stripe package
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;
  
  let event: Stripe.Event;
  
  // Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
  
  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Process the checkout completion
        if (session.mode === 'subscription') {
          await handleSubscriptionCreated(session);
        }
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancelled(subscription);
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Webhook handler failed', { status: 500 });
  }
}

// Handler for when a subscription is created
async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  if (!session.customer || !session.subscription) {
    console.error('Missing customer or subscription ID in session');
    return;
  }

  // Get the customer to find the associated user
  const customerId = typeof session.customer === 'string'
    ? session.customer
    : session.customer.id;

  // Get user by Stripe customer ID
  const { data: userData, error: userError } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (userError || !userData) {
    console.error('User not found for customer ID:', customerId);
    return;
  }

  const userId = userData.id;

  // Get subscription details
  const subscriptionId = typeof session.subscription === 'string'
    ? session.subscription
    : session.subscription.id;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Check which plan they subscribed to
  const planId = subscription.items.data[0]?.plan.id;

  // Determine the subscription tier based on the plan
  const isProPlan = planId === process.env.STRIPE_PRO_PLAN_ID;
  const subscriptionTier = isProPlan ? 'pro' : 'free';

  // Calculate expiration date
  const periodEnd = new Date(subscription.current_period_end * 1000).toISOString();

  // Update user's subscription status
  await supabaseAdmin
    .from('users')
    .update({
      subscription_tier: subscriptionTier,
      subscription_expires_at: periodEnd,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  // Add record to subscriptions table
  await supabaseAdmin
    .from('subscriptions')
    .insert({
      user_id: userId,
      plan_id: planId,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: periodEnd,
      cancel_at_period_end: subscription.cancel_at_period_end,
      payment_provider: 'stripe',
      payment_provider_subscription_id: subscriptionId
    });
}

// Handler for when a subscription is updated
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Get subscription ID
  const subscriptionId = subscription.id;

  // Find the subscription in our database
  const { data: subData, error: subError } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('payment_provider_subscription_id', subscriptionId)
    .single();

  if (subError || !subData) {
    console.error('Subscription not found:', subscriptionId);
    return;
  }

  const userId = subData.user_id;

  // Check which plan they are now on
  const planId = subscription.items.data[0]?.plan.id;

  // Determine the subscription tier based on the plan
  const isProPlan = planId === process.env.STRIPE_PRO_PLAN_ID;
  const subscriptionTier = isProPlan ? 'pro' : 'free';

  // Calculate expiration date
  const periodEnd = new Date(subscription.current_period_end * 1000).toISOString();

  // Update user's subscription status
  await supabaseAdmin
    .from('users')
    .update({
      subscription_tier: subscriptionTier,
      subscription_expires_at: periodEnd,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  // Update subscription record
  await supabaseAdmin
    .from('subscriptions')
    .update({
      plan_id: planId,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: periodEnd,
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString()
    })
    .eq('payment_provider_subscription_id', subscriptionId);
}

// Handler for when a subscription is cancelled
async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  // Get subscription ID
  const subscriptionId = subscription.id;

  // Find the subscription in our database
  const { data: subData, error: subError } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('payment_provider_subscription_id', subscriptionId)
    .single();

  if (subError || !subData) {
    console.error('Subscription not found:', subscriptionId);
    return;
  }

  const userId = subData.user_id;

  // Update user's subscription status
  await supabaseAdmin
    .from('users')
    .update({
      subscription_tier: 'free',
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  // Update subscription record
  await supabaseAdmin
    .from('subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('payment_provider_subscription_id', subscriptionId);
}

// Handler for successful invoice payment
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // Only handle subscription invoices
  if (invoice.subscription) {
    const subscriptionId = typeof invoice.subscription === 'string'
      ? invoice.subscription
      : invoice.subscription.id;

    // Get the subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Update subscription in our database
    await handleSubscriptionUpdated(subscription);
  }
}

// Handler for failed payments
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    const subscriptionId = typeof invoice.subscription === 'string'
      ? invoice.subscription
      : invoice.subscription.id;

    // Find the subscription in our database
    const { data: subData, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('user_id')
      .eq('payment_provider_subscription_id', subscriptionId)
      .single();

    if (subError || !subData) {
      console.error('Subscription not found:', subscriptionId);
      return;
    }

    const userId = subData.user_id;

    // Update subscription status to past_due
    await supabaseAdmin
      .from('subscriptions')
      .update({
        status: 'past_due',
        updated_at: new Date().toISOString()
      })
      .eq('payment_provider_subscription_id', subscriptionId);

    // You might also want to notify the user about the payment failure
    // This would typically be done through an email service
  }
}
