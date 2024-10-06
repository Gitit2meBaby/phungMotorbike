import { NextResponse } from 'next/server';

export async function POST(request) {
    const { message } = await request.json();
    console.log('Client debug:', message);
    return NextResponse.json({ success: true });
}
