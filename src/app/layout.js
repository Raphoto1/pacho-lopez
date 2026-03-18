import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";

import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Pacho Lopez Y La Cumbia Mestiza",
    template: "%s | Pacho Lopez Y La Cumbia Mestiza",
  },
  description: "Pacho Lopez Y La Cumbia Mestiza - Sitio Oficial",
};

export default async function RootLayout({ children }) {
  const messages = await getMessages();

  return (
    <html lang='en' data-theme='dark'>
      <head>
        <link rel='stylesheet' href='https://use.typekit.net/ank1ghx.css' />
      </head>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <NextIntlClientProvider messages={messages}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
          <NavBar />
          <main className='flex-1 lg:pt-16'>{children}</main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
