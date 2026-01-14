# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page lesson project built with Next.js 16.1.1, React 19.2.3, and Tailwind CSS 4. Uses the App Router pattern with TypeScript in strict mode.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

- **`src/app/`** - Next.js App Router pages and layouts
- **`src/components/ui/`** - Reusable UI components (button, card, input, label) built with Radix UI primitives and class-variance-authority (CVA)
- **`src/lib/utils.ts`** - `cn()` utility for merging Tailwind classes (clsx + tailwind-merge)

## Styling

- Tailwind CSS 4 with CSS-first configuration (no tailwind.config.js)
- Theme tokens defined as CSS variables in `src/app/globals.css` using oklch color format
- Dark mode via `.dark` class selector
- Components use CVA for variant-based styling

## Import Alias

`@/*` maps to `./src/*` (e.g., `import { cn } from "@/lib/utils"`)
