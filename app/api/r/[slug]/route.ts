import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { errorResponse } from '@/lib/api-utils';
import { UAParser } from 'ua-parser-js';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Find the referral by custom slug
    const { data: referral, error } = await supabaseAdmin
      .from('referrals')
      .select('id, url, status, user_id')
      .eq('custom_slug', slug)
      .single();
    
    if (error || !referral) {
      return NextResponse.json(
        errorResponse('Referral not found'),
        { status: 404 }
      );
    }
    
    // Check if referral is active
    if (referral.status !== 'active') {
      return NextResponse.json(
        errorResponse('This referral link is no longer active'),
        { status: 403 }
      );
    }
    
    // Get user information from request
    const userAgent = req.headers.get('user-agent') || '';
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     '127.0.0.1';
    const referer = req.headers.get('referer') || null;
    
    // Parse user agent
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || null;
    const os = parser.getOS().name || null;
    const device = parser.getDevice().type || 'desktop';
    
    // Record the click
    await supabaseAdmin
      .from('clicks')
      .insert({
        referral_id: referral.id,
        ip_address: ipAddress.split(',')[0].trim(), // Get the first IP if there are multiple
        user_agent: userAgent,
        referer_url: referer,
        device_type: device,
        browser,
        os,
        // We'll leave country, region, city as null for now
        // In a real implementation, you'd use a geolocation service here
      });
    
    // Check if user has Pro subscription to see if we need to track more analytics
    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('subscription_tier')
      .eq('id', referral.user_id)
      .single();
    
    const isPro = userData?.subscription_tier === 'pro';
    
    // If Pro user, we would do more detailed tracking here
    
    // Redirect to the target URL
    return NextResponse.redirect(referral.url);
  } catch (error) {
    console.error('Error processing referral click:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}

