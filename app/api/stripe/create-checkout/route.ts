import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@/lib/supabase';
import { errorResponse, successResponse } from '@/lib/api-utils';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16' // Use the version compatible with your installed Stripe package
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId, successUrl, cancelUrl } = body;
    
    // Validate inputs
    if (!priceId || !successUrl || !cancelUrl) {
      return NextResponse.json(
        errorResponse('Missing required parameters'),
        { status: 400 }
      );
    }
    
    // Get the current user
    const supabase = createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        errorResponse('Authentication required'),
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    const userEmail = session.user.email;
    
    // Get or create a Stripe customer for this user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();
    
    if (userError) {
      return NextResponse.json(
        errorResponse('User not found'),
        { status: 404 }
      );
    }
    
    let customerId = userData.stripe_customer_id;
    
    // If user doesn't have a Stripe customer ID yet, create one
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId: userId
        }
      });
      
      customerId = customer.id;
      
      // Save the customer ID to the user's record
      await supabase
        .from('users')
        .update({ 
          stripe_customer_id: customerId,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
    }
    
    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId
      }
    });
    
    return NextResponse.json(
      successResponse({ url: checkoutSession.url }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      errorResponse(error.message || 'An unexpected error occurred'),
      { status: 500 }
    );
  }
}