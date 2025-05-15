// POST (create) API key
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validated = createApiKeySchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        errorResponse('Invalid input', formatZodError(validated.error)),
        { status: 400 }
      );
    }
    
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
    
    // Check if user has API access
    const { data: userData } = await supabase
      .from('users')
      .select('subscription_tier')
      .eq('id', userId)
      .single();
    
    const isPro = userData?.subscription_tier === 'pro';
    
    if (!isPro) {
      return NextResponse.json(
        errorResponse('Pro subscription required for API access'),
        { status: 403 }
      );
    }
    
    const { data: settings } = await supabase
      .from('user_settings')
      .select('api_access')
      .eq('user_id', userId)
      .single();
    
    if (!settings?.api_access) {
      return NextResponse.json(
        errorResponse('API access is not enabled in your settings'),
        { status: 403 }
      );
    }
    
    // Generate a random API key
    const apiKey = `ref_${crypto.randomBytes(24).toString('hex')}`;
    
    // Create the API key record
    const { data: newKey, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: userId,
        key_name: validated.data.key_name,
        api_key: apiKey,
        permissions: validated.data.permissions || {},
        expires_at: validated.data.expires_at,
        is_active: true
      })
      .select('id, key_name, created_at')
      .single();
    
    if (error) {
      return NextResponse.json(
        errorResponse('Failed to create API key', { general: [error.message] }),
        { status: 500 }
      );
    }
    
    // Return the key - this is the only time the full key will be visible
    return NextResponse.json(
      successResponse({
        ...newKey,
        api_key: apiKey
      }, 'API key created successfully'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}