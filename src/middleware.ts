import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|manifest.webmanifest|sitemap.xml|robots.txt|favicon.ico).*)',
  ],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');

  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!accessToken && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
