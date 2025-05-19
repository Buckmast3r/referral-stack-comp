import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { errorResponse, successResponse } from '@/lib/api-utils';

/**
 * Fetch referral data by ID.
 */
async function fetchReferralData(referralId: string) {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Authentication required');
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from('referrals')
    .select('*, clicks:clicks(id, clicked_at)')
    .eq('user_id', userId)
    .eq('id', referralId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Count clicks
  const clickCount = Array.isArray(data.clicks) ? data.clicks.length : 0;
  // Remove raw clicks data from response to reduce payload size
  const { clicks, ...referralData } = data;

  return {
    ...referralData,
    click_count: clickCount
  };
}

/**
 * Handles the GET request for referrals.
 * Refactored to avoid using nextUrl.searchParams.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const referralId = url.searchParams.get('id');

  if (!referralId) {
    return NextResponse.json(
      { error: 'Referral ID is missing' },
      { status: 400 }
    );
  }

  try {
    const referralData = await fetchReferralData(referralId);
    return NextResponse.json({ data: referralData });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch referral data' },
      { status: 500 }
    );
  }
}