import { NextResponse } from 'next/server';

/**
 * Handles the GET request for categories.
 * Refactored to avoid direct usage of cookies.
 */
export async function GET(req: Request) {
  const authToken = req.headers.get('authorization') || '';

  if (!authToken) {
    return NextResponse.json(
      { error: 'Authorization token is missing' },
      { status: 401 }
    );
  }

  try {
    const categoriesData = await fetchCategoriesData(authToken);
    return NextResponse.json({ data: categoriesData });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories data' },
      { status: 500 }
    );
  }
}

async function fetchCategoriesData(authToken: string) {
  const response = await fetch('https://api.example.com/categories', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories data');
  }

  return response.json();
}
