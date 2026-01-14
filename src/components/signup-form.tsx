"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Account created successfully!" });
        setEmail("");
        setPassword("");
      } else {
        setMessage({ type: "error", text: data.error || "Signup failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-foreground/80"
        >
          Email
        </Label>
        <div className="relative group">
          <div
            className={cn(
              "absolute -inset-0.5 rounded-lg bg-gradient-to-r from-glow-cyan to-glow-purple opacity-0 blur-sm transition-opacity duration-300",
              "group-focus-within:opacity-75"
            )}
          />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="relative h-11 bg-background/50 backdrop-blur-sm border-border/50 focus-visible:border-glow-cyan focus-visible:ring-glow-cyan/30 placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-foreground/80"
        >
          Password
        </Label>
        <div className="relative group">
          <div
            className={cn(
              "absolute -inset-0.5 rounded-lg bg-gradient-to-r from-glow-purple to-glow-cyan opacity-0 blur-sm transition-opacity duration-300",
              "group-focus-within:opacity-75"
            )}
          />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="relative h-11 bg-background/50 backdrop-blur-sm border-border/50 focus-visible:border-glow-cyan focus-visible:ring-glow-cyan/30 placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {message && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium backdrop-blur-sm",
            message.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          )}
        >
          {message.type === "success" ? (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          {message.text}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="relative w-full h-11 font-semibold overflow-hidden group"
      >
        <span
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-glow-cyan via-glow-purple to-glow-cyan bg-[length:200%_100%] opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100 group-hover:animate-shimmer"
          )}
        />
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <svg
                className="size-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating account...
            </>
          ) : (
            <>
              Get Started
              <svg
                className="size-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </span>
      </Button>

      <p className="text-center text-xs text-muted-foreground/70">
        By signing up, you agree to our{" "}
        <a href="#" className="text-glow-cyan hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-glow-cyan hover:underline">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
