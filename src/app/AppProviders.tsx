'use client';

import { HeroUIProvider } from '@heroui/react';

import { Header } from './Header';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <Header />
      {children}
    </HeroUIProvider>
  );
}
