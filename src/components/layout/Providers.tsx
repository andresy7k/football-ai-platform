"use client";

import { AuthProvider } from "@/components/layout/AuthProvider";
import { QueryProvider } from "@/components/layout/QueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
