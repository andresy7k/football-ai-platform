"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/utils/cn";

interface EmailLoginFormProps {
  onSignIn: (email: string, password: string) => Promise<string | null>;
  onSignUp: (email: string, password: string) => Promise<string | null>;
}

export function EmailLoginForm({ onSignIn, onSignUp }: EmailLoginFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const errorMessage = isSignUp
        ? await onSignUp(email, password)
        : await onSignIn(email, password);

      if (errorMessage) {
        setError(errorMessage);
      } else if (isSignUp) {
        setSuccess("Check your email for a confirmation link.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          error={error ?? undefined}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isSignUp ? "new-password" : "current-password"}
        />
        {error && (
          <p className="text-caption text-[var(--color-red)]" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-caption text-[var(--color-teal)]" role="status">
            {success}
          </p>
        )}
        <Button type="submit" loading={loading} className="w-full" size="lg">
          {isSignUp ? "Create Account" : "Sign In"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
        <span className="text-caption text-[var(--color-text-tertiary)]">
          or
        </span>
        <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
      </div>

      <button
        type="button"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setError(null);
          setSuccess(null);
        }}
        className={cn(
          "text-body-small text-[var(--color-primary)]",
          "hover:underline transition-all",
        )}
      >
        {isSignUp
          ? "Already have an account? Sign in"
          : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}
