import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Allow public assets and certain pages
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/public/') ||
    pathname.startsWith('/assets/')
  ) {
    return NextResponse.next();
  }

  // Handle unauthenticated users


  if(token){
    const publicPaths = [ '/login', '/sign-up' ];
    if (publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  if(!token){
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login for /dashboard paths
    }
  }



 

  // Allow access for authenticated users to authorized routes
  return NextResponse.next();
}
