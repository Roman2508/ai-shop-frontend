"use client";

import { Montserrat } from "next/font/google";

import "../../styles/global.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased min-h-screen flex flex-col`}>
        <main className="grow pt-[110px] pb-[100px]">
          <br />
          {children}
          <br />
        </main>
      </body>
    </html>
  );
}
