import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { errorResponse, successResponse } from '@/lib/api-utils';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
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
    const { data: apiKey, error: checkError } = await supabase
      .from('api_keys')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single();
    
    if (checkError || !apiKey) {
      return NextResponse.json(
        errorResponse('API key not found or you do not have permission to delete it'),
        { status: 404 }
      );
    }
    
    // Delete the API key
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);
    
    if (error) {
      return NextResponse.json(
        errorResponse('Failed to delete API key', { general: [error.message] }),
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      successResponse(null, 'API key deleted successfully'),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}