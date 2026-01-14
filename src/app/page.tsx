import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "@/components/signup-form";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background dark">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Gradient orbs */}
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-glow-cyan/20 blur-3xl animate-[pulse-glow_4s_ease-in-out_infinite]" />
      <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-glow-purple/20 blur-3xl animate-[pulse-glow_4s_ease-in-out_infinite_1s]" />
      <div className="absolute left-1/2 top-1/4 h-60 w-60 -translate-x-1/2 rounded-full bg-glow-cyan/10 blur-3xl animate-[float_6s_ease-in-out_infinite]" />

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-glow-cyan" />
            </span>
            Next.js 16 + Vercel Deployment
          </div>
          <h1 className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Build. Deploy.
            <br />
            <span className="bg-gradient-to-r from-glow-cyan to-glow-purple bg-clip-text">
              Ship Fast.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Learn to deploy a Next.js app to Vercel with environment variables
            and a Neon PostgreSQL database.
          </p>
        </div>

        {/* Signup Card */}
        <div className="relative w-full max-w-md">
          {/* Card glow effect */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-glow-cyan/50 via-glow-purple/50 to-glow-cyan/50 opacity-50 blur-lg transition-opacity duration-500 hover:opacity-75" />

          <Card className="relative border-border/50 bg-card/80 backdrop-blur-xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl font-semibold">
                Create an account
              </CardTitle>
              <CardDescription className="text-muted-foreground/80">
                Enter your email below to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground/50">
          <span>Powered by</span>
          <div className="flex items-center gap-3">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Next.js
            </a>
            <span className="text-border">|</span>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Vercel
            </a>
            <span className="text-border">|</span>
            <a
              href="https://neon.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Neon
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  );
}
