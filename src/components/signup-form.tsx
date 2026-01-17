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
      <div className="space-y-2 group/email">
        <Label
          htmlFor="email"
          className={cn(
            "text-sm font-medium text-foreground/80",
            "transition-colors duration-300 ease-out",
            "group-focus-within/email:text-glow-cyan"
          )}
        >
          Email
        </Label>
        <div className="relative group">
          <div
            className={cn(
              "absolute -inset-px rounded-lg",
              "bg-gradient-to-r from-glow-cyan via-glow-purple to-glow-cyan",
              "opacity-0 blur-md transition-all duration-500 ease-out",
              "group-hover:opacity-25 group-hover:blur-sm",
              "group-focus-within:opacity-60 group-focus-within:blur-[6px]"
            )}
            aria-hidden="true"
          />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className={cn(
              "relative h-11 bg-background/60 backdrop-blur-sm",
              "border border-input transition-all duration-300 ease-out",
              "hover:border-glow-cyan/50 hover:bg-background/80",
              "focus-visible:border-glow-cyan focus-visible:bg-background/90",
              "focus-visible:ring-2 focus-visible:ring-glow-cyan/20 focus-visible:ring-offset-0",
              "placeholder:text-muted-foreground/50"
            )}
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
              "absolute -inset-0.5 rounded-lg bg-gradient-to-r from-glow-purple via-glow-cyan to-glow-purple",
              "opacity-0 blur-md transition-all duration-500 ease-out",
              "group-focus-within:opacity-60 group-focus-within:blur-sm",
              "group-hover:opacity-30"
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
            className={cn(
              "relative h-11 bg-background/60 backdrop-blur-sm",
              "border border-input transition-all duration-300 ease-out",
              "hover:border-glow-purple/50 hover:bg-background/80",
              "focus-visible:border-glow-cyan focus-visible:bg-background/90",
              "focus-visible:ring-2 focus-visible:ring-glow-cyan/20 focus-visible:ring-offset-0",
              "placeholder:text-muted-foreground/50"
            )}
          />
        </div>
      </div>

      {message && (
        <div
          className={cn(
            "relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium",
            "animate-slide-in-fade backdrop-blur-sm",
            "border shadow-sm transition-all duration-200",
            message.type === "success"
              ? "bg-success/10 text-success border-success/25 shadow-success/5"
              : "bg-destructive/10 text-destructive border-destructive/25 shadow-destructive/5"
          )}
        >
          <div
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-full",
              message.type === "success"
                ? "bg-success/20"
                : "bg-destructive/20"
            )}
          >
            {message.type === "success" ? (
              <svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <span className="flex-1">{message.text}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className={cn(
          "relative w-full h-12 font-semibold overflow-hidden group",
          "bg-gradient-to-r from-glow-cyan to-glow-purple",
          "text-primary-foreground",
          "border-0 shadow-lg shadow-glow-purple/20",
          "transition-all duration-300 ease-out",
          "hover:shadow-xl hover:shadow-glow-cyan/30 hover:scale-[1.02]",
          "active:scale-[0.98] active:shadow-md",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg disabled:hover:shadow-glow-purple/20"
        )}
      >
        {/* Animated shimmer overlay */}
        <span
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
            "bg-[length:200%_100%] opacity-0",
            "transition-opacity duration-500 ease-out",
            "group-hover:opacity-100 group-hover:animate-shimmer",
            "group-disabled:opacity-0"
          )}
        />
        {/* Glow effect on hover */}
        <span
          className={cn(
            "absolute -inset-1 rounded-xl bg-gradient-to-r from-glow-cyan via-glow-purple to-glow-cyan",
            "opacity-0 blur-lg -z-10",
            "transition-opacity duration-300",
            "group-hover:opacity-60"
          )}
        />
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <svg
                className="size-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="ml-1">Creating account...</span>
            </>
          ) : (
            <>
              Get Started
              <svg
                className={cn(
                  "size-5 transition-all duration-300 ease-out",
                  "group-hover:translate-x-1.5 group-hover:scale-110"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </span>
      </Button>

      <p className="text-center text-xs text-muted-foreground/70">
        By signing up, you agree to our{" "}
        <a
          href="#"
          className={cn(
            "text-glow-cyan/80 underline decoration-glow-cyan/30 decoration-1 underline-offset-2",
            "transition-all duration-200 ease-out",
            "hover:text-glow-cyan hover:decoration-glow-cyan/60 hover:underline-offset-4",
            "focus-visible:outline-none focus-visible:text-glow-cyan focus-visible:decoration-glow-cyan focus-visible:ring-1 focus-visible:ring-glow-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm"
          )}
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className={cn(
            "text-glow-cyan/80 underline decoration-glow-cyan/30 decoration-1 underline-offset-2",
            "transition-all duration-200 ease-out",
            "hover:text-glow-cyan hover:decoration-glow-cyan/60 hover:underline-offset-4",
            "focus-visible:outline-none focus-visible:text-glow-cyan focus-visible:decoration-glow-cyan focus-visible:ring-1 focus-visible:ring-glow-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm"
          )}
        >
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
