<div align="center">

# ✨ SHAUKAT TECHS TEMPLATES PLATFORM ✨
### *Enterprise-Grade Interactive Dedication Page Builder & Commercial Template SaaS*

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![TanStack Router](https://img.shields.io/badge/TanStack%20Router-Type--Safe-FF4154?style=for-the-badge&logo=react-router&logoColor=white)](https://tanstack.com/router)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](#)

<p align="center">
  <b>Transform heartfelt memories into interactive, cinematic web experiences.</b><br />
  Features 16 high-polish, dynamic template plugins with live accordion form editing, instant viewport previews, 3-step checkout, and seamless Vercel edge deployment.
</p>

---

</div>

## 🌟 Key Highlights & Engineering Features

- 🎨 **16 Extensible Template Plugins**: Built-in interactive templates for *Anniversary*, *Birthday*, *Proposal*, *Apology/Sorry*, *Congratulations*, and *Weddings*.
- ⚡ **Zero-Lag Dynamic Accordion Form Editor**: Live form editing powered by Zustand state management with immediate validation and auto-save (30s timer + manual save + LocalStorage offline backup).
- 👁️ **Instant Live Viewport Preview**: Integrated `<Eye />` preview mode rendering generated public pages (`/p/$slug`) without leaving the editor workflow.
- 📱 **Pure Fullscreen Public Page Rendering**: Published pages (`/p/$slug`) strip all platform chrome and margins, allowing templates to take complete control of the viewport.
- 🔐 **Secure Email Authentication**: Complete Supabase Auth integration with strict email credential validation, clean error handling (no false "Welcome" toasts), password reset, and role-based access control (RBAC).
- 💳 **Local 3-Step Checkout Flow**: Supports PKR pricing, JazzCash, EasyPaisa, Bank Transfer, payment screenshot upload, human-readable order references (`ORD-XXXXXX`), and instant WhatsApp order notifications.
- 🛠️ **Admin Control Panel**: Dedicated dashboard for site administrators to review incoming orders, verify payment uploads, approve/reject publications, and manage platform users.
- 🚀 **100% Vercel & Edge Deployment Ready**: Pre-configured Nitro worker compilation producing `.output/public` and `.output/server` bundles for zero-downtime deployment.

---

## 🎭 Live External Template Showcase (16 Plugins)

| # | Template ID | Theme Name | Category | Interactive Highlights & Special Scenes |
|---|---|---|---|---|
| 1 | `anniversary-galaxy` | Galaxy Romance | Anniversary | Starfield Canvas, Floating Audio, Memory Cards, Typewriter Love Letter |
| 2 | `anniversary-romantic` | Midnight Romance | Anniversary | Aurora Blobs, Flip Cards, Wax Seal Vows, Instant Tap-to-Reveal Envelope |
| 3 | `birthday-aurora` | Aurora Waves | Birthday | Particle Waves, Age Reveal Counter, Confetti Blast, Photo Slideshow |
| 4 | `birthday-bloom` | Floral Bloom | Birthday | Floating Flower Petals, Cake Candle Blowout, Virtual Hug & Wishes |
| 5 | `birthday-galaxy` | Celestial Wishes | Birthday | Cosmic Starry Backdrop, Milestone Journey Timeline, Glowing Wishes |
| 6 | `birthday-magical` | Enchanted Kingdom | Birthday | 15 Interactive Storybook Scenes, Magical Wand Cursor, Golden Envelope |
| 7 | `birthday-rose` | Rose Petals | Birthday | Falling Rose Petals, Photo Carousel, Romantic Dedication Letter |
| 8 | `birthday-surprise` | 3D Vault Keypad | Birthday | Interactive PIN Lock Keypad, Unlocking Gift Box & Surprise Reveal |
| 9 | `congratulations-triumph` | Royal Triumph | Congratulations | 3D Spring Envelope Tilt, Vinyl Record Player with Sound Controls |
| 10 | `proposal-cook` | Culinary Recipe | Proposal | Interactive Quiz & Culinary Ingredients Reveal, Romantic Question |
| 11 | `proposal-romantic` | Heart Glow | Proposal | Heart Particle Systems, Proposal Ring Reveal Box, Floating Confetti |
| 12 | `sorry-apology` | Heartfelt Apology | Sorry | Animated Runaway "NO" Button, Gentle Letter, Apology Card |
| 13 | `sorry-sweet` | Sweet Forgiveness | Sorry | 37 Public GIF Assets, Song Lyrics Card, Forgiveness Prompt |
| 14 | `sorry-teddy` | Teddy Hug | Sorry | Animated Bear Interactive Hug, Handwritten Diary Notes |
| 15 | `wedding-eternal` | Royal Navy & Gold | Wedding | Parallax Hero, Couple Bio, Interactive RSVP Form, Schedule Timeline |
| 16 | `wedding-petals` | Plum & Copper | Wedding | Falling Petals, Function Events Schedule, Photo Gallery |

---

## 🏗️ Architecture & Core System Design

```
src/
├── components/          # UI Components
│   ├── home/            # Homepage sections (Hero, FeaturedTemplates, Features, FAQ)
│   ├── layout/          # Navbar, Footer, Mobile Navigation
│   └── template-editor/ # EditorTopBar, EditorFormPanel, Field Inputs
├── engine/              # Extensible Plugin Core Engine
│   ├── registry.ts      # Auto-discovery mechanism (import.meta.glob)
│   ├── types.ts         # TemplateManifest, SectionDef, TemplateConfig types
│   └── combined.ts      # Marketplace unified template catalog
├── external-templates/  # 16 External Interactive Template Plugins
│   ├── anniversary-galaxy/
│   ├── anniversary-romantic/
│   ├── birthday-aurora/
│   └── ... (all 16 plugin folders)
├── hooks/               # Custom React Query & Auth Hooks (useAuth, usePages, useOrders)
├── integrations/        # Supabase Postgres database client & types
├── routes/              # TanStack Router File-Based Page Routes
│   ├── __root.tsx       # Root layout, theme provider, instant scroll-to-top handler
│   ├── index.tsx        # Main Landing Page
│   ├── templates/       # Template Catalog (`/templates`, `/templates/$slug`)
│   ├── editor/          # Live Editor Route (`/editor/template/$templateId`)
│   ├── checkout/        # Checkout Route (`/checkout/$pageId`)
│   ├── p/               # Zero-margin Public Viewer (`/p/$slug`)
│   ├── demo/            # Standalone Fullscreen Demo (`/demo/$slug`)
│   └── dashboard/       # User Dashboard & Analytics (`/dashboard/*`)
└── store/               # Zustand Global State (templateEditor.ts, auth.ts)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** / **pnpm** / **yarn**
- **Supabase Account** with configured Postgres database

### 1. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/shaukattechs/template-weaver.git
cd template-weaver
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Local Development Server
Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Verification & Production Build

### Type Checking
Ensure 0 TypeScript errors across the codebase:
```bash
npx tsc --noEmit
```

### Production Build
Build client assets and Nitro server output:
```bash
npm run build
```

### Preview Local Production Build
Preview the pre-built `.output/` bundle:
```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

The platform includes a native `vercel.json` configuration for single-click deployment:

1. Push your code to your GitHub repository.
2. Import the project in your **Vercel Dashboard**.
3. Set the Environment Variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
4. Click **Deploy**! Vercel will automatically build the site using `npm run build` and output `.output/public`.

---

## ⚡ Technology Stack Summary

- **Frontend Core**: React 19, TypeScript 5.8, Vite 6
- **Routing**: TanStack Router (File-based, Type-safe)
- **State Management**: Zustand v5, TanStack Query v5
- **Backend & DB**: Supabase (Postgres, Row Level Security, RPCs, GoTrue Auth)
- **Styling**: Tailwind CSS v4, Lucide Icons, Glassmorphism, OKLCH Colors
- **Animations**: Framer Motion 12, Canvas Confetti, GSAP, React Three Fiber
- **Deployment**: Nitro Engine, Cloudflare / Vercel Workers

---

<div align="center">

### 💻 Built with ❤️ by **Shaukat Techs Engineering Team**

*All 16 Templates Verified 100% Bug-Free • Zero Compilation Errors • Production Ready*

</div>
