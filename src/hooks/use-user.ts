"use client";

import { useAuth } from "@/components/layout/AuthProvider";

export function useUser() {
  const { user, session, loading } = useAuth();

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    userId: user?.id ?? null,
  };
}
