import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware melhorado para garantir o roteamento correto
export function middleware(request: NextRequest) {
  // Lidar com favicon
  if (request.nextUrl.pathname === '/favicon.ico') {
    return NextResponse.rewrite(new URL('/favicon.ico', request.url));
  }
  
  // Lidar com SVGs
  if (request.nextUrl.pathname.endsWith('.svg')) {
    return NextResponse.rewrite(new URL(request.nextUrl.pathname, request.url));
  }

  // Para todas as outras rotas, apenas continuar normalmente
  return NextResponse.next();
}

// Configuração para o matcher - inclui apenas rotas necessárias
export const config = {
  matcher: [
    '/favicon.ico',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ]
};
