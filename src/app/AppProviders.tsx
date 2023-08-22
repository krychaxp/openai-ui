'use client';

import { NextUIProvider } from '@nextui-org/react';

import { Header } from './Header';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Header />
      {children}
    </NextUIProvider>
  );
}
