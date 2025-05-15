import { NextResponse } from 'next/server';
import { errorResponse } from '@/lib/api-utils';

export function handleServerError(error: unknown, message = 'An unexpected error occurred') {
  console.error(message, error);
  return NextResponse.json(
    errorResponse(message),
    { status: 500 }
  );
}

export function handleApiError(message: string, status = 400) {
  return NextResponse.json(
    errorResponse(message),
    { status }
  );
}