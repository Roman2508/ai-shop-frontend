import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import "../../styles/global.css";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import AppProgressBar from "@/components/layout/AppProgressBar";
import ApolloClientProvider from "@/providers/ApolloClientProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "AI Phone Shop",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased min-h-screen flex flex-col`}>
        <ApolloClientProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
              <ToasterProvider>
                <AppProgressBar>
                  <Header />
                  <main className="grow pt-[110px] pb-[100px]">{children}</main>
                  <Footer />
                </AppProgressBar>
              </ToasterProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
