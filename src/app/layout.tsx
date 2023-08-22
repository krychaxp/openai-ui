import { Inter } from 'next/font/google';

import { AppProviders } from './AppProviders';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
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
