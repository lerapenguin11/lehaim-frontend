import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const requestPathname = request.nextUrl.pathname

    if (requestPathname === '/login' || requestPathname === '/register') {
        return
    }

    if (!request.cookies.has('auth_token')) {
        return NextResponse.redirect(
            new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/login`, request.url)
        )
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        { source: '/' },
    ],
}
