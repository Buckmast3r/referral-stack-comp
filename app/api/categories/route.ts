import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { errorResponse, successResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    // Categories can be accessed without authentication
    const supabase = createServerSupabaseClient();
    
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_name', { ascending: true });
    
    if (error) {
      return NextResponse.json(
        errorResponse('Failed to fetch categories', { general: [error.message] }),
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      successResponse(categories),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      errorResponse('An unexpected error occurred'),
      { status: 500 }
    );
  }
}
