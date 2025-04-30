'use client'

import '../../styles/global.css'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={`antialiased min-h-screen flex flex-col`}>
        <main className="grow pt-[110px] pb-[100px]">
          <br />
          {children}
          <br />
        </main>
      </body>
    </html>
  )
}
