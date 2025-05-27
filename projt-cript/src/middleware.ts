// Middleware desativado para evitar conflitos de rotas na Vercel
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
//
// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname === '/favicon.ico') {
//     return NextResponse.rewrite(new URL('/public/favicon.ico', request.url));
//   }
//   if (request.nextUrl.pathname.endsWith('.svg')) {
//     const svgPath = request.nextUrl.pathname;
//     return NextResponse.rewrite(new URL(`/public${svgPath}`, request.url));
//   }
//   return NextResponse.next();
// }
//
// export const config = {
//   matcher: [
//     '/favicon.ico',
//     '/((?!api|_next/static|_next/image|.*\\.png$).*)'
//   ],
// };
