import { Inter } from 'next/font/google';
import Script from 'next/script';

import { AppProviders } from './AppProviders';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const NEXT_PUBLIC_GOOGLE_GTAG = 'G-QQYM9S6SDQ';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_GTAG}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${NEXT_PUBLIC_GOOGLE_GTAG}');
        `}
        </Script>
      </head>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'OpenAi Images Generator | Playground',
  description: 'Simple UI for generating images with OpenAI API',
};
