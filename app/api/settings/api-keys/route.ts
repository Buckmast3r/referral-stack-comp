import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// Handle GET requests
	return NextResponse.json({ message: 'GET request successful' });
}

export async function POST(req: NextRequest) {
	// Handle POST requests
	const body = await req.json();
	return NextResponse.json({ message: 'POST request successful', data: body });
}