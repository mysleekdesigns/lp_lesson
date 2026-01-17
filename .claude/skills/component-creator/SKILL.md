---
name: component-creator
description: Creates React components following project conventions. Use when asked to create a new component, build UI elements, or add new features requiring components.
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
context: fork
---

# Component Creator

## Instructions

When creating React components for this project:

1. **Location**: Place components in `src/components/ui/` for reusable UI components
2. **File naming**: Use lowercase with hyphens (e.g., `my-component.tsx`)
3. **TypeScript**: Use strict TypeScript with proper prop interfaces
4. **Styling**: Use Tailwind CSS 4 with the `cn()` utility from `@/lib/utils`
5. **Variants**: Use class-variance-authority (CVA) for component variants

## Component Template

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "default-variant-classes",
        secondary: "secondary-variant-classes",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

## Checklist

- [ ] Uses `"use client"` directive if client-side interactivity is needed
- [ ] Exports both component and variants
- [ ] Uses `forwardRef` for proper ref forwarding
- [ ] Includes proper TypeScript types
- [ ] Uses `cn()` for class merging
