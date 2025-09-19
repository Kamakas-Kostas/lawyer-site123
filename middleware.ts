// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedPaths = ['/admin', '/api/admin'];

  const isProtected = protectedPaths.some(path => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get('auth_token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (!['owner', 'admin'].includes(decoded.role)) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
