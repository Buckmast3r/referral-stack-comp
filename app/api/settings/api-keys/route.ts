import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { createApiKeySchema } from '@/schemas/api-keys';
import { errorResponse, successResponse } from '@/utils/response';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { formatZodError, validateApiKey } from '@/utils/validation';

const crypto = require('crypto');
const randomBytes = crypto.randomBytes;

// POST (create) API key
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { apiKey } = req.body;
    
    // Validate input
    const validated = createApiKeySchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json(
        errorResponse('Invalid input', formatZodError(validated.error))
      );
    }
    
    // Get current user
    const supabase = createServerSupabaseClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return res.status(401).json(
        errorResponse('Authentication required')
      );
    }
    
    const userId = session.user.id;
    
    // Check if user has API access
    const { data: userData } = await supabase
      .from('users')
      .select('subscription_tier')
      .eq('id', userId)
      .single();
    
    const isPro = userData?.subscription_tier === 'pro';
    
    if (!isPro) {
      return res.status(403).json(
        errorResponse('Pro subscription required for API access')
      );
    }
    
    const { data: settings } = await supabase
      .from('user_settings')
      .select('api_access')
      .eq('user_id', userId)
      .single();
    
    if (!settings?.api_access) {
      return res.status(403).json(
        errorResponse('API access is not enabled in your settings')
      );
    }
    
    // Generate a random API key
    const generatedApiKey = `ref_${randomBytes(24).toString('hex')}`;
    
    // Create the API key record
    const { data: newKey, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: userId,
        key_name: validated.data.key_name,
        api_key: generatedApiKey,
        permissions: validated.data.permissions || {},
        expires_at: validated.data.expires_at,
        is_active: true
      })
      .select('id, key_name, created_at')
      .single();
    
    if (error) {
      return res.status(500).json(
        errorResponse('Failed to create API key', { general: [error.message] })
      );
    }
    
    // Return the key - this is the only time the full key will be visible
    return res.status(201).json(
      successResponse({
        ...newKey,
        api_key: generatedApiKey
      }, 'API key created successfully')
    );
  } catch (error) {
    console.error('Error creating API key:', error);
    return res.status(500).json(
      errorResponse('An unexpected error occurred')
    );
  }
}