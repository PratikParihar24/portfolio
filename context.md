# Portfolio Project Context

## Overview
This is a modern, single-page portfolio website for Pratik Parihar, a 4th-year CS undergraduate specializing in real-time systems, offline-first architectures, and AI tooling. The site is built with React, Vite, and Tailwind CSS, utilizing Framer Motion for rich physics-spring animations and Three.js (React Three Fiber) for an interactive 3D avatar.

## Architecture
- **Frontend Framework:** React 19 + Vite + TypeScript.
- **Styling:** Tailwind CSS v4, utilizing a custom CSS-variable driven theme system (`index.css`) with frosted glass panels, ambient glow effects, and high-contrast readability.
- **Animations:** Framer Motion for spring physics, accordion expand/collapse transitions, scroll-fade storytelling, and magnetic cursor tracking.
- **3D Graphics:** `@react-three/fiber` and `@react-three/drei` for rendering a responsive 3D avatar that tracks mouse movement.
- **State Management:** Zustand (`useAppStore.ts`) for managing global theme (light/dark mode), navigation state, and command palette.
- **Form Handling:** Serverless integration via Web3Forms (no backend server required; contact submissions route directly to email).
- **Data Layer:** Decoupled content structure maintained in `frontend/src/data/content.json` and mirrored in root `content.json`.

## Core Sections & Features
1. **Hero Section (`HeroSection.tsx`):** Headline, direct CTAs, interactive photo frame with ambient backlighting, and ⌘K Command Palette trigger.
2. **About Section (`AboutSection.tsx`):** Word-by-word spring entrance animation highlighting key background and focus areas.
3. **Projects Section (`ProjectsSection.tsx`):** 
   - One-at-a-time accordion layout with smooth layout animations.
   - Fixed-column alignment for GitHub (`</>`) and Live (`Live ↗`) action links.
   - Interactive `<MagneticChip />` badges featuring official tech icons.
   - Highlighted key engineering decisions and architectural rationale for each project (e.g. Parihar Brothers offline-first mutation outbox delta-sync, BiasBench automated judge AI).
   - Developer Utilities sub-grid for lightweight tools (FocusFlow, CSS Gradient Generator).
4. **Skills Section (`SkillsSection.tsx`):**
   - Categorized card grid with ambient light glow and category icons.
   - Spring-physics `<MagneticChip />` pills that translate towards the cursor on hover with subtle rotations.
5. **Achievements Section (`AchievementsSection.tsx`):**
   - Spotlight layout with 3D tilt interaction via `<TiltCard />`.
   - Spotlight cards for Devang Mehta IT Award (Rank 1, 3× Winner) and ISRO SAC exposure selection (38 / 500+).
   - Highlighted metrics for GTU Ideathon Finalist, 9.51 CGPA, and 100% TFWS Merit Scholarship.
6. **Contact Section (`ContactSection.tsx`):**
   - Direct serverless delivery to Gmail via Web3Forms API.
   - Built-in loading states, error handling, and success confirmation.
7. **Global Navigation & Utility:**
   - Global floating skip-to-next-section button on the bottom right that cycles through sections and wraps back to top.
   - Theme toggle supporting smooth light and dark mode transitions.
   - Accessible Resume route with direct PDF download from `/public/resume.pdf`.

## Project Structure
```text
portfolio/
├── content.json          # Mirrored data definition
├── context.md            # Comprehensive project architecture & context
├── README.md             # Repository documentation & getting started guide
└── frontend/
    ├── index.html        # HTML entry point
    ├── vite.config.ts    # Vite bundler configuration
    ├── package.json      # Dependencies and scripts
    ├── public/
    │   └── resume.pdf    # Downloadable resume asset
    └── src/
        ├── main.tsx      # React root
        ├── App.tsx       # Main layout & Theme provider
        ├── index.css     # CSS Variables, theme tokens, and typography
        ├── store/        # Zustand state stores
        ├── data/         # content.json data source for components
        ├── pages/        # Home and Resume views
        ├── components/
        │   ├── 3d/       # React Three Fiber 3D avatar & lighting
        │   ├── sections/ # Hero, About, Projects, Skills, Achievements, Contact
        │   └── ui/       # MagneticChip, TiltCard, ScrollFadeText, CommandPalette
```
