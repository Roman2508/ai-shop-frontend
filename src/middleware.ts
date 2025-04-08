import { NextRequest, NextResponse } from 'next/server'

const middleware = (request: NextRequest) => {
  const SESSION_NAME = process.env.NEXT_PUBLIC_SESSION_NAME ?? 'ai-shop-session'
  const session = request.cookies.get(SESSION_NAME)?.value

  const isProfilePage = request.url.includes('/profile')
  const isAdminPage = request.url.includes('/admin')

  if (isProfilePage || isAdminPage) {
    if (!session) {
      return NextResponse.redirect(new URL('/catalog', request.url))
    }

    return NextResponse.next()
  }
}

const config = {
  matcher: ['/profile', '/profile/:path*', '/admin', '/admin/:path*', '/catalog', '/catalog/:path*'],
}

export { middleware, config }
