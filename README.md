<div align="center">

# 🌌 Sothearith Kim — Full-Stack Developer Portfolio

A modern, high-performance personal portfolio website built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Three.js**.

[![Live Demo](https://img.shields.io/badge/Demo-Live_Website-blue?style=for-the-badge&logo=vercel)](https://portfolio-chi-sandy-61.vercel.app)
[![Release](https://img.shields.io/badge/Release-v1.0.0-emerald?style=for-the-badge&logo=github)](https://github.com/Sothearith22/Portfolio-Web/releases)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🚀 Overview

**Portfolio-Web** is the portfolio website of **Kim Sothearith**, an Information Technology student at the Royal University of Phnom Penh (RUPP) and Web Developer Intern at RMA Cambodia. The application highlights featured software projects, technical skills, professional work experience, and educational background with interactive 3D visual experiences.

---

## ✨ Features

- **🪐 Interactive 3D Cosmic Background**:
  - Immersive Three.js constellation space with dynamic particle drift, floating tech badges, and mouse-parallax depth tracking.
  - Automatically adapts star and particle colors between Dark and Light themes.
- **✨ 3D Tilt & Glow Cards**:
  - Realistic 3D perspective hover tilt with specular glare highlights across project and skill cards.
- **🛡️ Secure Contact Form**:
  - Instant notifications sent to Telegram via a secured backend proxy (`/api/contact`).
  - Strict input validation via Zod schemas, 10 KB payload limits, and IP-based rate limiting (preventing credential leaks, spam, and DoS).
- **🌗 Dark & Light Theme**:
  - Persistent theme switching with smooth transitions and high-contrast accessibility.
- **⚡ Blazing Fast Performance**:
  - Optimized Vite & Rolldown code-splitting ensuring the main application bundle is under **100 kB**.
  - Fast page loads, lazy chunk evaluation, and cached vendor bundles.
- **📱 Fully Responsive**:
  - Tailored UI for desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build & Bundler** | [Vite 8](https://vite.dev/) + `@vitejs/plugin-react-swc` |
| **Styling & Design** | [Tailwind CSS 3](https://tailwindcss.com/) + `tailwindcss-animate` |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| **3D & Visuals** | [Three.js](https://threejs.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State & Data Fetching** | [@tanstack/react-query](https://tanstack.com/query) |
| **Schema Validation** | [Zod](https://zod.dev/) |
| **Testing** | [Vitest](https://vitest.dev/) + `@testing-library/react` |
| **Backend / Serverless** | Node.js Serverless Functions (`/api/contact.ts`) on Vercel |

---

## 📁 Project Structure

```text
Portfolio-Web/
├── api/
│   └── contact.ts              # Vercel Serverless Function for secure Telegram contact
├── public/
│   └── robots.txt              # Search engine crawler configuration
├── src/
│   ├── assets/                 # Project screenshots, images, and CV PDF
│   │   ├── cv/
│   │   └── *.png
│   ├── components/
│   │   ├── portfolio/          # Core portfolio page sections
│   │   │   ├── About.tsx       # Personal bio & journey
│   │   │   ├── Blog.tsx        # Technical articles & write-ups
│   │   │   ├── Contact.tsx     # Contact form with backend proxy
│   │   │   ├── Experience.tsx  # Work timeline & references
│   │   │   ├── Footer.tsx      # Social links & copyright
│   │   │   ├── Header.tsx      # Sticky navigation & theme toggle
│   │   │   ├── Hero.tsx        # Hero intro & call to action
│   │   │   ├── Projects.tsx    # Filterable project gallery
│   │   │   ├── Section.tsx     # Reusable section wrapper
│   │   │   ├── Skills.tsx      # Technical skill badges & proficiencies
│   │   │   └── ThreeBackground.tsx # Interactive 3D scene
│   │   └── ui/                 # Accessible Radix / shadcn UI components
│   ├── config/
│   │   └── env.ts              # Public configuration values
│   ├── data/
│   │   └── portfolio.ts        # Centralized portfolio data (projects, skills, timeline)
│   ├── hooks/                  # Custom React hooks (useTheme, useInView, etc.)
│   ├── pages/                  # Page route views (Index.tsx, NotFound.tsx)
│   ├── App.tsx                 # Root application component & routing
│   └── main.tsx                # Entry point
├── vite.config.ts              # Vite configuration, dev proxy, and code splitting
├── vitest.config.ts            # Unit testing configuration
└── tailwind.config.ts          # Tailwind CSS theme setup
```

---

## ⚙️ Getting Started

### 1. Prerequisites
Ensure you have Node.js installed:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 2. Clone & Install

```bash
git clone https://github.com/Sothearith22/Portfolio-Web.git
cd Portfolio-Web
npm install
```

### 3. Environment Setup (Optional for Contact Form)

Create a `.env` file at the root of the project:

```bash
cp .env.example .env
```

Add your Telegram bot credentials (used by the local development proxy and serverless backend):

```env
BOT_TOKEN="your_telegram_bot_token"
CHAT_ID="your_telegram_chat_id"
```

> **Note**: Tokens are kept on the server and are never exposed to client-side bundles.

### 4. Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### 5. Running Tests

```bash
npm test
```

### 6. Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🔒 Security Best Practices

- **Zero Credentials in Browser**: Telegram Bot credentials are only accessed server-side via `/api/contact`.
- **DoS & Spam Prevention**: Request body is limited to 10 KB with IP-based rate limiting (5 submissions per minute).
- **Dependency Security**: All transitive dependencies audited with **0 known vulnerabilities**.
- **Privacy Protection**: Personal phone numbers are withheld from public web scrapers and search indexing.

---

## 🚢 Deployment

This repository is optimized for deployment on **[Vercel](https://vercel.com/)**:

1. Import repository into Vercel.
2. Framework preset: **Vite**.
3. Set environment variables (`BOT_TOKEN`, `CHAT_ID`) in the Vercel Dashboard under **Project Settings > Environment Variables**.
4. Deploy!

---

## 👤 Author

**Kim Sothearith**
- **GitHub**: [@Sothearith22](https://github.com/Sothearith22)
- **Portfolio**: [portfolio-chi-sandy-61.vercel.app](https://portfolio-chi-sandy-61.vercel.app)
- **Email**: [kimsothearith2007@gmail.com](mailto:kimsothearith2007@gmail.com)
- **Location**: Phnom Penh, Cambodia

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
