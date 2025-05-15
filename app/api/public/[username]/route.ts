import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { errorResponse, successResponse } from '@/lib/api-utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    
    // Fetch user profile
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, username, full_name, avatar_url, bio')
      .eq('username', username)
      .single();
    
    if (userError || !user) {
      return NextResponse.json(
        errorResponse('User not found'),
        { status: 404 }
      );
    }
    
    // Check if profile is public
    const { data: settings, error: settingsError } = await supabaseAdmin
      .from('user_settings')
      .select('public_profile')
      .eq('user_id', user.id)
      .single();
    
    const isPublic = !settings || settingsError || settings.public_profile !== false;
    
    if (!isPublic) {
      return NextResponse.json(
        errorResponse('This profile is private'),
        { status: 403 }
      );
    }
    
    // Fetch active referrals
    const { data: referrals, error: referralsError } = await supabaseAdmin
      .from('referrals')
      .select(`
        id,
        name,
        category,
        url,
        custom_slug,
        logo_color,
        description,
        is_featured,
        display_order
      `)
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('is_featured', { ascending: false })
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (referralsError) {
      console.error('Error fetching referrals:', referralsError);
      // Continue anyway as we can still show the profile even if referrals fail
    }
    
    // Create response
    return NextResponse.json(
      successResponse({
        profile: {
          username: user.username,
          fullName: user.full_name,
          avatarUrl: user.avatar_url,
          bio: user.bio
        },
        referrals: referrals || []
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching public profile:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}