import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { z } from 'zod';
import { formatZodError } from '@/lib/api-utils';

// Settings validation schema
const settingsSchema = z.object({
  public_profile: z.boolean().optional(),
  default_logo_color: z.string().optional(),
  custom_domain: z.string().optional().nullable(),
  white_labeling: z.boolean().optional(),
  api_access: z.boolean().optional(),
  auto_expiring_links: z.boolean().optional(),
  notification_preferences: z.record(z.any()).optional(),
  theme_preferences: z.record(z.any()).optional()
});

// GET settings
export async function GET(req: NextRequest) {
  try {
    // Get current user
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        errorResponse('Authentication required'),
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Fetch user settings
    const { data: settings, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is fine
      return NextResponse.json(
        errorResponse('Failed to fetch settings', { general: [error.message] }),
        { status: 500 }
      );
    }
    
    // If no settings exist yet, return defaults
    if (!settings) {
      const defaultSettings = {
        public_profile: true,
        default_logo_color: 'bg-blue-500',
        custom_domain: null,
        white_labeling: false,
        api_access: false,
        auto_expiring_links: false,
        notification_preferences: {},
        theme_preferences: {}
      };
      
      return NextResponse.json(
        successResponse(defaultSettings),
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      successResponse(settings),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}

// PUT (update) settings
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validated = settingsSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        errorResponse('Invalid input', formatZodError(validated.error)),
        { status: 400 }
      );
    }
    
    // Get current user
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        errorResponse('Authentication required'),
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Check for premium features
    if (
      validated.data.custom_domain || 
      validated.data.white_labeling ||
      validated.data.api_access ||
      validated.data.auto_expiring_links
    ) {
      // Check if user has pro subscription
      const { data: userData } = await supabase
        .from('users')
        .select('subscription_tier')
        .eq('id', userId)
        .single();
      
      const isPro = userData?.subscription_tier === 'pro';
      
      if (!isPro) {
        return NextResponse.json(
          errorResponse('Pro subscription required for these settings'),
          { status: 403 }
        );
      }
      
      // For custom domain, additionally check if they purchased the add-on
      if (validated.data.custom_domain) {
        const { data: addOnData, error: addOnError } = await supabase
          .from('add_ons')
          .select('id')
          .eq('user_id', userId)
          .eq('add_on_type', 'custom_domain')
          .eq('status', 'active')
          .single();
        
        if (addOnError || !addOnData) {
          return NextResponse.json(
            errorResponse('Custom domain add-on required'),
            { status: 403 }
          );
        }
      }
    }
    
    // Check if settings already exist
    const { data: existingSettings } = await supabase
      .from('user_settings')
      .select('user_id')
      .eq('user_id', userId)
      .single();
    
    let result;
    
    if (existingSettings) {
      // Update existing settings
      result = await supabase
        .from('user_settings')
        .update(validated.data)
        .eq('user_id', userId)
        .select();
    } else {
      // Create new settings
      result = await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          ...validated.data
        })
        .select();
    }
    
    if (result.error) {
      return NextResponse.json(
        errorResponse('Failed to update settings', { general: [result.error.message] }),
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      successResponse(result.data[0], 'Settings updated successfully'),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}