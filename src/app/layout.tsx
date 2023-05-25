import "./globals.css";
import { Inter } from "next/font/google";
import { AppProviders } from "./AppProviders";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

export const metadata = {
  title: "OpenAI Playground",
  description: "Play with OpenAI's API",
};
