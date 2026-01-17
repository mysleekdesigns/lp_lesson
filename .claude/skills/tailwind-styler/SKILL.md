---
name: tailwind-styler
description: Applies Tailwind CSS 4 styling using project theme tokens. Use when styling components, fixing layout issues, or implementing designs.
allowed-tools:
  - Read
  - Edit
  - Glob
---

# Tailwind Styler

## Instructions

This project uses Tailwind CSS 4 with CSS-first configuration.

### Theme Tokens

Theme variables are defined in `src/app/globals.css` using oklch color format:

```css
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
/* etc. */
```

### Usage Patterns

1. **Colors**: Use semantic tokens like `bg-background`, `text-foreground`, `bg-primary`
2. **Dark mode**: Handled via `.dark` class - tokens auto-switch
3. **Spacing**: Use Tailwind's spacing scale (p-4, m-2, gap-6, etc.)
4. **Responsive**: Mobile-first with `sm:`, `md:`, `lg:`, `xl:` breakpoints

### Common Patterns

```tsx
// Card pattern
<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">

// Button pattern
<button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2">

// Input pattern
<input className="border border-input bg-background rounded-md px-3 py-2 focus:ring-2 focus:ring-ring">

// Flexbox centering
<div className="flex items-center justify-center">

// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Class Merging

Always use the `cn()` utility from `@/lib/utils` to merge classes:

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-classes", conditional && "conditional-classes", className)}>
```

### Avoid

- Don't use arbitrary values when a token exists
- Don't hardcode colors - use theme tokens
- Don't forget hover/focus states for interactive elements
