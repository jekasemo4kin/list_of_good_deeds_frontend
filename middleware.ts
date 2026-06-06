import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Или имя твоей куки, если оно другое

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');

  // Если нет токена и пользователь не на странице логина/регистрации — на логин
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Если есть токен и пользователь пытается попасть на логин/регистрацию — на главную
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Указываем, какие пути проверять
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};