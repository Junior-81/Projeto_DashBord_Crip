import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirecionar solicitações para o favicon.ico na pasta public
  if (request.nextUrl.pathname === '/favicon.ico') {
    return NextResponse.rewrite(new URL('/public/favicon.ico', request.url));
  }
  
  // Redirecionar solicitações SVG
  if (request.nextUrl.pathname.endsWith('.svg')) {
    const svgPath = request.nextUrl.pathname;
    return NextResponse.rewrite(new URL(`/public${svgPath}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/favicon.ico',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
};
