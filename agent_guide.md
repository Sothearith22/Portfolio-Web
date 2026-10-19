# Agent Guide — Portfolio-Web

> A concise reference for any AI assistant working in this codebase. Read this before making any changes.

---

## 1. Project Overview

**Portfolio-Web** is the personal portfolio website of **Sothearith Kim** (alias: Rith), a Full-Stack Developer based in Phnom Penh. It is a single-page application (SPA) built with React + TypeScript + Vite, styled with Tailwind CSS, and using shadcn/ui component primitives.

The site showcases:
- Profile / Hero section
- About, Skills, Projects, Experience, Contact sections
- Integrated Telegram Bot for contact form submissions
- Dark/light theme toggle (persisted in `localStorage`)

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript 5 |
| Build Tool | Vite 5 (with `@vitejs/plugin-react-swc`) |
| Styling | Tailwind CSS 3 + `tailwindcss-animate` |
| UI Components | shadcn/ui (Radix UI primitives) |
| Routing | React Router v6 |
| Data Fetching | TanStack React Query v5 |
| Forms | Zod (validation only, no react-hook-form on contact form) |
| Notifications | Sonner (toast) |
| Icons | lucide-react |
| Testing | Vitest + @testing-library/react |
| Contact Channel | Telegram Bot API (via `VITE_BOT_TOKEN` + `VITE_CHAT_ID`) |

---

## 3. Directory Structure

```
Portfolio-Web/
├── public/
│   └── robots.txt
├── src/
│   ├── assets/              # Static images and CV PDF
│   │   ├── booking.png
│   │   ├── electronic.png
│   │   ├── profile.png
│   │   ├── student.png
│   │   ├── ten11.png
│   │   └── cv/
│   │       └── KimSothearith-Webdeveloper-CV.pdf
│   ├── components/
│   │   ├── NavLink.tsx      # Utility nav link wrapper
│   │   ├── ScrollToHash.tsx # Scrolls to hash on route change
│   │   ├── portfolio/       # ← ALL page sections live here
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Section.tsx  # Shared section wrapper component
│   │   │   └── Skills.tsx
│   │   └── ui/              # shadcn/ui primitives (DO NOT edit directly)
│   ├── config/
│   │   └── env.ts           # ← Single source of truth for env vars
│   ├── data/
│   │   └── portfolio.ts     # ← ALL content data lives here
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-theme.ts     # Dark/light theme hook
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts         # cn() helper (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── Index.tsx        # Main page — assembles all sections
│   │   └── NotFound.tsx     # 404 page
│   ├── test/
│   │   ├── example.test.ts
│   │   └── setup.ts
│   ├── App.tsx              # Router setup + providers
│   ├── App.css
│   ├── index.css            # Tailwind directives + custom CSS vars
│   ├── main.tsx             # React root mount
│   └── vite-env.d.ts
├── agent_guide.md           # ← This file
├── package.json
└── ...config files (vite, tailwind, tsconfig, eslint)
```

---

## 4. Routing

All routes render `<Index />` (single-page scroll), except the 404 catch-all:

| Path | Component |
|---|---|
| `/` | `Index` |
| `/about` | `Index` |
| `/skills` | `Index` |
| `/projects` | `Index` |
| `/experience` | `Index` |
| `/contact` | `Index` |
| `*` | `NotFound` |

Navigation in `Header.tsx` uses React Router `<Link>` with `to="/about"` etc. The `ScrollToHash` component handles smooth scroll-to-section behavior on route change.

---

## 5. Content & Data (`src/data/portfolio.ts`)

> [!IMPORTANT]
> **All content edits** (name, bio, projects, skills, experience) must go in `src/data/portfolio.ts`. Never hardcode content directly in components.

### Exported data shapes

```ts
// Profile info (name, title, position, phone, location, email, website, socials, roles)
export const profile = { ... }

// About bio paragraphs and core focus
export const about = { bio: string[], coreFocus: string }

// Hard skills grouped by 5 categories: ERP Development, Backend Development, Frontend Development, Databases, Developer Tools
export const skills: { category: string; items: string[] }[]

// Soft skills & languages from CV
export const softSkills: string[]
export const languages: { name: string; level: string }[]
export const interests: string[]

// Education & Certifications from CV
export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}
export const education: EducationItem[]
export const achievements: string[]
export const reference: { name: string; role: string; company: string; phone: string; email: string }

// Projects list
export interface Project {
  title: string;
  image?: string;
  description: string;
  stack: string[];
  category: "Full-Stack" | "Frontend" | "Backend" | "ERP";
  status?: string;
  github?: string;         // optional backend or main repo
  githubFrontend?: string; // optional frontend repo
  demo?: string;           // optional
}
export const projects: Project[]

// Work experience (RMA Cambodia & KRU IT Solution)
export interface ExperienceItem {
  role: string;
  company: string;
  project?: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  isCurrent?: boolean;
}
export const experience: ExperienceItem[]
 
// Technical Blog articles
export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}
export const blogPosts: BlogPost[]
```

---

## 6. Environment Variables (`src/config/env.ts`)

All environment values are centralized in `src/config/env.ts`. Create a `.env` file at the project root for secrets:

```env
VITE_BOT_TOKEN=your_telegram_bot_token
VITE_CHAT_ID=your_telegram_chat_id
```

| Variable | Purpose |
|---|---|
| `VITE_BOT_TOKEN` | Telegram Bot API token (for contact form) |
| `VITE_CHAT_ID` | Telegram chat ID to receive messages |

> [!WARNING]
> The contact form currently calls the Telegram API **directly from the browser**, which exposes `BOT_TOKEN` in the client bundle. A commented-out backend proxy pattern exists in `Contact.tsx` — prefer that approach for production.

---

## 7. Key Components

### `Section.tsx` — Shared Section Wrapper
Every page section uses this. Props: `id`, `eyebrow` (mono label), `title`, `description?`, `children`, `className?`.

### `Header.tsx`
- Sticky top nav with dark/light toggle
- Mobile hamburger menu (below `md` breakpoint)
- Active route highlighted via `useLocation()`

### `Hero.tsx`
- Profile photo from `src/assets/profile.png`
- "View Project" and "View CV" CTA buttons
- GitHub + Email social icons

### `Contact.tsx`
- Zod-validated form (name, email, message)
- Sends message via Telegram Bot API on submit
- 10-second cooldown after successful send
- Toast feedback via Sonner

### `useTheme` hook
- Reads/writes theme from `localStorage` under key `portfolio-theme`
- Toggles `dark` class on `document.documentElement`

---

## 8. Component Patterns & Conventions

- **Path alias**: `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig`)
- **Styling**: Tailwind utility classes only. Custom CSS vars defined in `index.css`
- **shadcn/ui**: Components in `src/components/ui/` are auto-generated — **do not manually edit** them. Re-generate via `shadcn` CLI if needed
- **Named exports**: All portfolio components use named exports (`export const Foo = ...`), not default exports
- **No state management library**: Local `useState`/`useEffect` only; TanStack Query is available but not yet actively used

---

## 9. Development Commands

```bash
npm run dev          # Start dev server (Vite HMR)
npm run build        # Production build
npm run build:dev    # Dev-mode build
npm run preview      # Preview production build
npm run lint         # ESLint check
npm run test         # Run tests once (Vitest)
npm run test:watch   # Watch mode tests
```

---

## 10. Adding / Modifying Content

### Add a new project
Edit `src/data/portfolio.ts` → `projects` array. Add a new image to `src/assets/` and import it at the top of the file.

### Add a new skill
Edit `src/data/portfolio.ts` → `skills` array. Add the item string to the relevant category's `items` array, or add a new category object.

### Add a new experience entry
Edit `src/data/portfolio.ts` → `experience` array.

### Change profile info
Edit `src/data/portfolio.ts` → `profile` object. For contact email or GitHub URL, update `src/config/env.ts`.

### Add a new page section
1. Create `src/components/portfolio/NewSection.tsx`
2. Wrap content with `<Section id="..." eyebrow="..." title="...">` 
3. Export the data from `portfolio.ts` if content-driven
4. Import and render in `src/pages/Index.tsx`
5. Add a nav item in `Header.tsx` → `NAV_ITEMS`
6. Add the route in `App.tsx` → `<Routes>`

---

## 11. Assets

| File | Usage |
|---|---|
| `profile.png` | Hero section avatar |
| `electronic.png` | Electronic Store project card |
| `ten11.png` | TEN ELEVEN Clone project card |
| `student.png` | Student Management System project card |
| `booking.png` | Booking System project card |
| `KimSothearith-Webdeveloper-CV.pdf` | Linked from Hero "View CV" button |

---

## 12. Known Notes & TODOs

- The Telegram direct-call pattern in `Contact.tsx` leaks `BOT_TOKEN` client-side. A commented backend proxy is in the file — use it for production deployments.
- Some `experience` entries are commented out (placeholder companies). Uncomment and fill in real data as needed.
- The `profile.tagline` field is currently an empty string — can be filled in.
- `Linkedin` icon is imported in `Hero.tsx` but not rendered (no LinkedIn URL in `profile.socials`). Add if needed.

