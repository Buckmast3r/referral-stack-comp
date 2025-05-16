import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { errorResponse, successResponse } from '@/lib/api-utils';

export const GET = async (req: NextRequest) => {
  try {
    const supabase = createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        errorResponse('Authentication required'),
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const searchParams = new URL(req.url).searchParams;
    const period = searchParams.get('period') || '30d';

    let startDate = new Date();
    switch (period) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case 'all':
        startDate = new Date(0);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }

    const startDateStr = startDate.toISOString();
    const { data: referrals, error: referralsError } = await supabase
      .from('referrals')
      .select('id')
      .eq('user_id', userId);

    if (referralsError || !referrals || referrals.length === 0) {
      return NextResponse.json(
        successResponse({
          total_referrals: 0,
          total_clicks: 0,
          recent_clicks: 0,
          clicks_by_day: [],
          top_referrals: []
        })
      );
    }

    const referralIds = referrals.map((r: { id: string }) => r.id);
    const { count: totalClicks } = await supabase
      .from('clicks')
      .select('id', { count: 'exact', head: true })
      .in('referral_id', referralIds);

    const { count: recentClicks } = await supabase
      .from('clicks')
      .select('id', { count: 'exact', head: true })
      .in('referral_id', referralIds)
      .gte('clicked_at', startDateStr);

    const { data: clicksByDay } = await supabase
      .rpc('get_clicks_by_day', {
        user_id_param: userId,
        start_date_param: startDateStr
      });

    const { data: topReferrals } = await supabase
      .from('referrals')
      .select(`
        id,
        name,
        url,
        category,
        custom_slug,
        logo_color,
        clicks:clicks(id)
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    const processedTopReferrals = topReferrals
      ?.map((referral: { clicks: any[]; [key: string]: any }) => {
        const clickCount = Array.isArray(referral.clicks) ? referral.clicks.length : 0;
        const { clicks, ...rest } = referral;
        return { ...rest, click_count: clickCount };
      })
      .sort((a: { click_count: number }, b: { click_count: number }) => b.click_count - a.click_count)
      .slice(0, 5);

    return NextResponse.json(
      successResponse({
        total_referrals: referrals.length,
        total_clicks: totalClicks || 0,
        recent_clicks: recentClicks || 0,
        clicks_by_day: clicksByDay || [],
        top_referrals: processedTopReferrals || []
      })
    );
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
};