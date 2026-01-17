---
name: nextjs-helper
description: Helps with Next.js 16 App Router patterns, routing, data fetching, and server components. Use when working with pages, layouts, routing, or Next.js features.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
---

# Next.js Helper

## Instructions

This project uses Next.js 16.1.1 with the App Router pattern.

### File Conventions

| File | Purpose |
|------|---------|
| `page.tsx` | Route UI (required for route to be accessible) |
| `layout.tsx` | Shared layout wrapping children |
| `loading.tsx` | Loading UI (Suspense boundary) |
| `error.tsx` | Error boundary |
| `not-found.tsx` | 404 page |

### Server vs Client Components

**Server Components (default)**:
- Can directly access databases, filesystems
- Can use async/await at component level
- Cannot use hooks, browser APIs, or event handlers

**Client Components** (add `"use client"` at top):
- Can use React hooks
- Can handle user interactions
- Can access browser APIs

### Data Fetching Patterns

```tsx
// Server Component - direct async
async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{/* render data */}</div>
}

// With caching options
const data = await fetch('https://...', {
  cache: 'force-cache', // default - cached
  // cache: 'no-store', // never cache
  // next: { revalidate: 3600 } // revalidate every hour
})
```

### Route Handlers (API Routes)

Create in `app/api/[route]/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ received: body })
}
```

### Dynamic Routes

```
app/
├── blog/
│   ├── [slug]/
│   │   └── page.tsx      // /blog/my-post
│   └── [...slug]/
│       └── page.tsx      // /blog/a/b/c (catch-all)
```

### Metadata

```tsx
// Static
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
}

// Dynamic
export async function generateMetadata({ params }) {
  return { title: `Post: ${params.slug}` }
}
```

### Common Imports

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { redirect, notFound } from 'next/navigation'
```
