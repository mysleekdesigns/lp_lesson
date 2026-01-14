# PRD: Next.js + Vercel Deployment Lesson

## Overview
Create a landing page with a signup form to teach coworkers how to deploy a Next.js project to Vercel with environment variables and a Neon PostgreSQL database.

## Tech Stack (Latest Versions - January 2026)
- **Framework**: Next.js 16.1 (App Router, React 19.2, Turbopack default)
- **Styling**: Tailwind CSS v4.1
- **Components**: shadcn/ui (latest with Next.js 16 support)
- **Database**: Neon serverless PostgreSQL with `@neondatabase/serverless` v1.0.0+
- **Runtime**: Node.js 20.9+ (required for Next.js 16)
- **Hosting**: Vercel

---

## Lesson Structure

### Part 1: Project Setup

#### 1.1 Create Next.js 16 Project
```bash
npx create-next-app@latest landing-page-lesson
```
The new `create-next-app` template includes:
- App Router by default
- TypeScript-first configuration
- Tailwind CSS v4 pre-configured
- ESLint included
- Turbopack as default bundler

Options to select:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Turbopack: Yes (now default)
- Import alias: @/*

#### 1.2 Install shadcn/ui
```bash
npx shadcn@latest init
```
Configuration:
- Style: Default (or New York)
- Base color: Slate
- CSS variables: Yes

#### 1.3 Add Required shadcn Components
```bash
npx shadcn@latest add button input label card
```

---

### Part 2: Build the Landing Page

#### 2.1 Create Form Component
**File**: `src/components/signup-form.tsx`

Features:
- Email input field using shadcn Input component
- Password input field
- Submit button with loading state
- Client-side form handling with React state
- Form submission to API route

#### 2.2 Create Landing Page
**File**: `src/app/page.tsx`

Layout:
- Centered Card component with form
- Simple header/title
- Responsive design using Tailwind CSS v4

**Note on Tailwind v4**: Configuration is now CSS-first. Basic setup just requires:
```css
@import "tailwindcss";
```
No `tailwind.config.js` needed for standard usage.

---

### Part 3: Database Setup (Neon)

#### 3.1 Create Neon Account & Project
1. Sign up at https://neon.tech
2. Create new project
3. Copy connection string (pooled connection recommended)

#### 3.2 Install Database Dependencies
```bash
npm install @neondatabase/serverless
```

**Note**: `@neondatabase/serverless` v1.0.0+ requires Node.js 19+. Since Next.js 16 requires Node.js 20.9+, this is automatically satisfied.

#### 3.3 Create Database Schema
Run in Neon SQL Editor:
```sql
CREATE TABLE signups (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3.4 Create Database Client
**File**: `src/lib/db.ts`

```typescript
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);
```

---

### Part 4: Environment Variables

#### 4.1 Local Development
**File**: `.env.local`
```
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```

#### 4.2 Key Concepts to Cover
- `.env.local` for local-only secrets (never committed)
- `.env` for non-sensitive defaults (can be committed)
- `NEXT_PUBLIC_` prefix exposes variables to client-side code
- Never commit database credentials or API keys
- Verify `.env.local` is in `.gitignore`

---

### Part 5: API Route

#### 5.1 Create Signup Endpoint
**File**: `src/app/api/signup/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Basic validation
  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password required' },
      { status: 400 }
    );
  }

  try {
    await sql`
      INSERT INTO signups (email, password)
      VALUES (${email}, ${password})
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Signup failed' },
      { status: 500 }
    );
  }
}
```

**Teaching Note**: Explain that in production you would hash passwords with bcrypt - this lesson focuses on the deployment workflow.

---

### Part 6: Deploy to Vercel

#### 6.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: landing page with signup form"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

#### 6.2 Connect to Vercel
1. Go to vercel.com and sign in
2. Click "Add New" → "Project"
3. Import GitHub repository
4. Vercel auto-detects Next.js 16

#### 6.3 Add Environment Variables in Vercel
1. Go to Project Settings → Environment Variables
2. Add `DATABASE_URL` with Neon connection string
3. Select environments: Production, Preview, Development
4. Click "Save"

#### 6.4 Deploy
- Automatic deployment triggers on push to main
- Preview deployments created for pull requests
- View build logs in Vercel dashboard

---

### Part 7: Verification & Testing

#### 7.1 Test Locally
```bash
npm run dev
```
- Open http://localhost:3000
- Submit the signup form
- Check Neon console → Tables → signups to verify data

#### 7.2 Test Production
- Visit deployed Vercel URL (shown in dashboard)
- Submit form with test email/password
- Verify record appears in Neon database

#### 7.3 Troubleshooting Checklist
- Environment variable not working? Check spelling and restart dev server
- Database connection failed? Verify connection string includes `?sslmode=require`
- Build failed on Vercel? Check build logs for missing dependencies

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Landing page with signup form |
| `src/components/signup-form.tsx` | Form component with shadcn/ui |
| `src/lib/db.ts` | Neon database connection |
| `src/app/api/signup/route.ts` | API endpoint for form submission |
| `.env.local` | Local environment variables |

---

## Learning Objectives

By the end of this lesson, coworkers will understand:

1. **Next.js 16 Basics**: Project structure, App Router, API routes, Turbopack
2. **Tailwind CSS v4**: New CSS-first configuration, utility classes
3. **shadcn/ui**: Installing and using the component library
4. **Environment Variables**: Local vs production, security best practices, `NEXT_PUBLIC_` prefix
5. **Database Integration**: Connecting Neon serverless Postgres to Next.js
6. **Vercel Deployment**: Git integration, environment configuration, automatic deployments

---

## Optional Extensions (for advanced learners)

- Add form validation with Zod + react-hook-form
- Implement password hashing with bcrypt
- Add toast notifications with shadcn/ui Sonner
- Create an admin page to view all signups
- Add rate limiting to the API route

---

## Sources

- [Next.js 16 Release](https://nextjs.org/blog/next-16)
- [Next.js 16.1 Release](https://nextjs.org/blog/next-16-1)
- [Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- [shadcn/ui Changelog](https://ui.shadcn.com/docs/changelog)
- [Neon Serverless Driver GA](https://neon.com/blog/serverless-driver-ga)
- [Neon Documentation](https://neon.com/docs/serverless/serverless-driver)
