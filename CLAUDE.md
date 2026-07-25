# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js 16

This project pins **Next.js 16** (App Router, React 19). Its APIs, conventions, and file structure differ from earlier versions you may know. Before writing framework code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices. See `AGENTS.md`.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build (also the fastest way to type-check the whole app; `tsconfig` has `noEmit`)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config, `eslint-config-next`)

No test framework is configured — there are no unit/e2e tests or a `test` script. Verification is done via `npm run build`, `npm run lint`, and the visual QA phase of `/clone-website`.

## What this repo is

A **template for reverse-engineering a website and rebuilding it as a pixel-perfect clone** — not a finished product. The Next.js + shadcn/ui + Tailwind v4 base is pre-scaffolded; the actual work is driven by the `/clone-website` skill (`.claude/skills/clone-website/SKILL.md`), configured by `TARGET.md`.

The committed source is a worked example: an **Allbirds-style ecommerce store** rebranded as "FashionHero" (home, product listing, product detail, cart, checkout, account, wishlist). Treat it as reference/starting content that gets replaced when cloning a new target.

### The clone workflow

`/clone-website <url>` runs a multi-phase pipeline (requires **Chrome MCP** for browser automation):
1. **Reconnaissance** — screenshots + design-token extraction from the live site
2. **Foundation** — fonts, colors, `globals.css`, asset downloads
3. **Component specs** — detailed spec files written to `docs/research/components/` with exact `getComputedStyle()` values, states, and content
4. **Parallel build** — one builder agent per section, each in its **own git worktree**, merged at the end (see the "MOST IMPORTANT NOTES" in `AGENTS.md`)
5. **Assembly & QA** — wire up pages, visual-diff against the original

Extraction artifacts and screenshots live in `docs/research/` and `docs/design-references/`.

## Architecture

Read these together to understand how a page renders:

- **`src/app/layout.tsx`** wraps everything in **`<Shell>`** (`src/components/shell.tsx`), which nests the client-side context providers in a fixed order: `AuthProvider → CartProvider → WishlistProvider → QuickViewProvider`, then renders `AnnouncementBar` / `Header` / `main` / `Footer`. All cross-page UI state (cart drawer, wishlist, quick-view modal, auth) flows through these providers via `useCart()`, `useWishlist()`, etc. — **not** a store library.
  - State is **in-memory React state only** — nothing is persisted to `localStorage` or a backend. Adding an item opens the cart drawer as a side effect. This is intentional for a demo/template.
- **Data is hardcoded** in `src/data/` (`products.ts`, `collections.ts`, `sellers.ts`). There is no API or database — pages import these modules directly. TARGET.md notes students are expected to swap this for a real API.
- **Types** are centralized in `src/types/` (`Product`, `ProductColor`, `CartItem`, `Seller`, …); import via the `@/*` alias.
- **Routes** (`src/app/`): `page.tsx` (home), `collections/[slug]` (listing), `products/[slug]` (detail), `checkout`, `wishlist`, `about`, `account/{login,register}`.
- **Components** (`src/components/`): page **sections** in `sections/`, shadcn primitives in `ui/`, extracted SVGs in `icons.tsx`. UI primitives are built on **`@base-ui/react`** (not `@radix-ui`), styled with `class-variance-authority` + the `cn()` helper in `src/lib/utils.ts`.

## Conventions

- **Path alias**: `@/*` → `./src/*`.
- **Styling**: Tailwind CSS v4 with oklch design tokens in `src/app/globals.css`; merge classes with `cn()`, never string concatenation. No inline styles.
- **Components**: add `"use client"` only where interactivity/context is needed; keep server components server-side.
- `AGENTS.md` holds the full code-style rules (strict TS, no `any`, named exports, mobile-first) and is imported below — follow it.

@AGENTS.md
