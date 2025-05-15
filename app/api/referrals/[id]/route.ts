import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { errorResponse, successResponse } from '@/lib/api-utils';

// GET a specific referral
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const referralId = params.id;
    
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
    
    // Fetch referral with click stats
    const { data: referral, error } = await supabase
      .from('referrals')
      .select(`
        *,
        clicks:clicks(id, clicked_at),
        categories:categories(name, display_name, color_code, icon_name)
      `)
      .eq('id', referralId)
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          errorResponse('Referral not found'),
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        errorResponse('Failed to fetch referral', { general: [error.message] }),
        { status: 500 }
      );
    }
    
    // Calculate stats
    const clickCount = Array.isArray(referral.clicks) ? referral.clicks.length : 0;
    
    // Get recent clicks (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentClicks = Array.isArray(referral.clicks) 
      ? referral.clicks.filter((click: { clicked_at: string }) =>
          new Date(click.clicked_at) >= sevenDaysAgo
        )
      : [];
    
    // Remove raw clicks array from the response
    const { clicks, ...referralData } = referral;
    
    return NextResponse.json(
      successResponse({
        ...referralData,
        stats: {
          total_clicks: clickCount,
          recent_clicks: recentClicks.length,
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching referral details:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}

// UPDATE a specific referral
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const referralId = params.id;
    const body = await req.json();
    
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
    
    // Verify ownership
    const { data: existingReferral, error: checkError } = await supabase
      .from('referrals')
      .select('id')
      .eq('id', referralId)
      .eq('user_id', userId)
      .single();
    
    if (checkError || !existingReferral) {
      return NextResponse.json(
        errorResponse('Referral not found or you do not have permission to update it'),
        { status: 404 }
      );
    }
    
    // Prepare update data
    const updateData = {
      ...body,
      updated_at: new Date().toISOString()
    };
    
    // Update referral
    const { data: updatedReferral, error } = await supabase
      .from('referrals')
      .update(updateData)
      .eq('id', referralId)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json(
        errorResponse('Failed to update referral', { general: [error.message] }),
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      successResponse(updatedReferral, 'Referral updated successfully'),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating referral:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}

// DELETE a specific referral
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const referralId = params.id;
    
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
    
    // Verify ownership
    const { data: existingReferral, error: checkError } = await supabase
      .from('referrals')
      .select('id')
      .eq('id', referralId)
      .eq('user_id', userId)
      .single();
    
    if (checkError || !existingReferral) {
      return NextResponse.json(
        errorResponse('Referral not found or you do not have permission to delete it'),
        { status: 404 }
      );
    }
    
    // Delete referral
    const { error } = await supabase
      .from('referrals')
      .delete()
      .eq('id', referralId);
    
    if (error) {
      return NextResponse.json(
        errorResponse('Failed to delete referral', { general: [error.message] }),
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      successResponse(null, 'Referral deleted successfully'),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting referral:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}