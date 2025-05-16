import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { errorResponse, successResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    // Get query parameters for filtering and pagination
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = searchParams.get('sort') || 'created_at';
    const sortOrder = searchParams.get('order') || 'desc';
    
    // Get current user
    const supabase = createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        errorResponse('Authentication required'),
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Build query
    let query = supabase
      .from('referrals')
      .select('*, clicks:clicks(id, clicked_at)', { count: 'exact' })
      .eq('user_id', userId)
      .order(sortBy as any, { ascending: sortOrder === 'asc' })
      .range((page - 1) * limit, page * limit - 1);
    
    // Apply filters if provided
    if (category) {
      query = query.eq('category', category);
    }
    
    if (status) {
      query = query.eq('status', status);
    }
    
    // Execute query
    const { data: referrals, count, error } = await query;
    
    if (error) {
      return NextResponse.json(
        errorResponse('Failed to fetch referrals', { general: [error.message] }),
        { status: 500 }
      );
    }
    
    // Process referrals to include click counts
    const processedReferrals = referrals?.map(referral => {
      // Count clicks
      const clickCount = Array.isArray(referral.clicks) ? referral.clicks.length : 0;
      // Remove raw clicks data from response to reduce payload size
      const { clicks, ...referralData } = referral;
      
      return {
        ...referralData,
        click_count: clickCount
      };
    });
    
    return NextResponse.json(
      successResponse({
        referrals: processedReferrals,
        pagination: {
          total: count || 0,
          page,
          limit,
          total_pages: count ? Math.ceil(count / limit) : 0
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}