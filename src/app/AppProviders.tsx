"use client";

import { theme } from "@/utils/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
