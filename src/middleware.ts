import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|service-worker.js|_next/static|_next/image|images|manifest.webmanifest|manifest.json|sitemap.xml|robots.txt|favicon.ico|/).*)',
  ],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');

  const isLoginPage = request.nextUrl.pathname === '/login';
  const isRootPage = request.nextUrl.pathname === '/';

  if (!accessToken && !isLoginPage && !isRootPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
