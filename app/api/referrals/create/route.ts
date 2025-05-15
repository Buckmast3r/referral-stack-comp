import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase';
import { errorResponse, formatZodError, successResponse } from '@/lib/api-utils';

// Define validation schema for referral creation
const createReferralSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  category: z.string().min(1, 'Category is required'),
  url: z.string().url('Please enter a valid URL'),
  custom_slug: z.string().optional().nullable(),
  logo_color: z.string().min(1, 'Logo color is required'),
  description: z.string().optional().nullable(),
  is_featured: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate input
    const validated = createReferralSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        errorResponse('Invalid input', formatZodError(validated.error)),
        { status: 400 }
      );
    }
    
    // Get current user from session
    const supabase = createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        errorResponse('Authentication required'),
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Check if user has reached referral limit based on subscription tier
    const { data: userData } = await supabase
      .from('users')
      .select('subscription_tier')
      .eq('id', userId)
      .single();
    
    // Count existing referrals
    const { count: referralCount } = await supabase
      .from('referrals')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    const maxReferrals = userData?.subscription_tier === 'pro' ? Infinity : 25;
    
    if (referralCount !== null && referralCount >= maxReferrals) {
      return NextResponse.json(
        errorResponse('You have reached the maximum number of referrals for your plan. Upgrade to Pro for unlimited referrals.'),
        { status: 403 }
      );
    }
    
    // Prepare data for insertion
    const referralData = {
      ...validated.data,
      user_id: userId,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Insert referral into database
    const { data: referral, error } = await supabase
      .from('referrals')
      .insert(referralData)
      .select()
      .single();
    
    if (error) {
      // Handle unique constraint errors specifically
      if (error.code === '23505') {
        return NextResponse.json(
          errorResponse('You already have a referral with this name'),
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        errorResponse('Failed to create referral', { 
          general: [error.message] 
        }),
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      successResponse(referral, 'Referral created successfully'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating referral:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}