import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl;

    // Check if the URL ends with .html
    if (url.pathname.endsWith('.html')) {
        // Redirect to the homepage or another URL
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // Allow other requests to continue
    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: '/:path*',
};
