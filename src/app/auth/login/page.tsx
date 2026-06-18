"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OAuthButtons } from "@/app/auth/_components/OAuthButtons";
import { EmailLoginForm } from "@/app/auth/_components/EmailLoginForm";
import { useUser } from "@/hooks/use-user";
import {
  signInWithGoogle,
  signInWithGitHub,
  signInWithEmail,
  signUpWithEmail,
} from "@/lib/auth/client";

function getUrlError(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("error") === "auth_failed"
    ? "Authentication failed. Please try again."
    : null;
}

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useUser();
  const [showEmail, setShowEmail] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(getUrlError);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/today");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error) setUrlError(error.message);
  };

  const handleGitHub = async () => {
    const { error } = await signInWithGitHub();
    if (error) setUrlError(error.message);
  };

  const handleSignIn = async (email: string, password: string) => {
    const { error } = await signInWithEmail(email, password);
    if (error) return error.message;
    router.push("/today");
    return null;
  };

  const handleSignUp = async (email: string, password: string) => {
    const { error } = await signUpWithEmail(email, password);
    if (error) return error.message;
    return null;
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="flex w-full max-w-sm flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--color-primary)]">
            <span className="text-display-small text-white font-bold">AI</span>
          </div>
          <h1 className="text-display-small text-white">Football AI</h1>
          <p className="text-body text-[var(--color-text-secondary)]">
            Sign in to access your predictions
          </p>
        </div>

        {/* Error */}
        {urlError && (
          <div className="rounded-[var(--radius-card)] bg-[var(--color-red)]/10 px-4 py-3">
            <p className="text-body-small text-[var(--color-red)]">{urlError}</p>
          </div>
        )}

        {/* OAuth Buttons */}
        <OAuthButtons onGoogleSignIn={handleGoogle} onGitHubSignIn={handleGitHub} />

        {/* Email toggle */}
        {!showEmail ? (
          <button
            onClick={() => setShowEmail(true)}
            className="text-body-small text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-center"
          >
            Sign in with email instead
          </button>
        ) : (
          <EmailLoginForm onSignIn={handleSignIn} onSignUp={handleSignUp} />
        )}

        {/* Footer */}
        <p className="text-center text-caption text-[var(--color-text-tertiary)]">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
