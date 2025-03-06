import { NextRequest, NextResponse } from 'next/server'

const middleware = (request: NextRequest) => {
  console.log('MIDDLEWARE WORKED')
  const session = request.cookies.get('session')?.value

  const isAuthPage = request.url.includes('/profile')

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL('/catalog', request.url))
    }

    return NextResponse.next()
  }

  if (!session) {
    return NextResponse.redirect(new URL('/catalog', request.url))
  }
}

export const config = {
  matcher: ['/profile', '/profile/:path*', '/admin', '/admin/:path*', '/catalog', '/catalog/:path*'],
}

export default middleware
