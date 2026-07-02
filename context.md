# Portfolio Project Context

## Overview
This is a modern, single-page portfolio website for Pratik Parihar, a 4th-year CS undergraduate specializing in real-time systems and AI tooling. The site is built with React, Vite, and Tailwind CSS, utilizing Framer Motion for animations and Three.js (React Three Fiber) for an interactive 3D avatar.

## Architecture
- **Frontend Framework:** React 18 + Vite + TypeScript.
- **Styling:** Tailwind CSS v4, heavily relying on a custom CSS-variable driven theme system (`index.css`) to implement a "Neural Glass" design language (glassmorphism).
- **Animations:** Framer Motion for scroll-linked animations and page transitions.
- **3D Graphics:** `@react-three/fiber` and `@react-three/drei` for rendering a responsive 3D avatar that tracks mouse movement.
- **State Management:** Zustand (`useAppStore.ts`) for managing global theme (light/dark mode) and an interactive contextual tooltip system.
- **Data Layer:** All content (projects, skills, achievements, profile data) is decoupled from UI components and sourced from `content.json`.

## Core Features
1. **Interactive 3D Avatar (`Scene.tsx`):** A 3D model that follows the user's cursor.
2. **Neural Glass UI (`index.css`):** Consistent use of frosted glass panels (`.glass-panel`), blurred backgrounds, and subtle glowing borders across both light and dark modes.
3. **Dynamic Dark Mode:** Fully functional toggle that relies on explicit `:root` and `.dark` CSS variables rather than Tailwind `@theme` overrides, ensuring runtime stability.
4. **Stacked Scroll Projects (`ProjectsSection.tsx`):** Sticky positioning to create a "deck of cards" stacking effect as the user scrolls through projects.
5. **Contextual Guide (`useAppStore.ts`):** A global state tooltip system that displays engineering rationale ("Why this tool?") when the user clicks info icons.
6. **Live GitHub Activity (`GithubFeed.tsx`):** Fetches and displays recent commits, PRs, and stars directly from the GitHub API.

## Project Structure
```text
portfolio/
├── content.json          # Single source of truth for portfolio data
├── frontend/
│   ├── index.html        # Entry HTML
│   ├── vite.config.ts    
│   ├── tailwind.config.ts
│   └── src/
│       ├── main.tsx      # React root
│       ├── App.tsx       # Main layout & Theme toggle
│       ├── index.css     # CSS Variables & Glassmorphism classes
│       ├── store/        # Zustand state
│       ├── data/         # Symlink/copy of content.json
│       ├── components/
│       │   ├── 3d/       # React Three Fiber components
│       │   ├── sections/ # Page sections (Hero, About, Projects, etc.)
│       │   └── ui/       # Shared UI components (GithubFeed)
```

## Current State & Recent Fixes
- **Typography:** Updated the About section to feature massive, animated (blur-reveal) typography mimicking premium agency designs.
- **Layout:** Fixed sticky project cards to stack tightly near the top (`5rem + 1.5rem * idx`), preventing content cutoff on smaller screens.
- **Glassmorphism:** Ensured all background colors and text colors use inline CSS variables (`var(--text-main)`, etc.) to prevent Tailwind utility class conflicts during theme switching.
- **Assets:** Added CDN-hosted Devicon SVG logos to the Skills section.

## Next Steps / Backlog
- Replace the primitive 3D shape (`Scene.tsx`) with a final customized `.glb` avatar.
- Further refine custom button shapes in the Hero section (currently reverted to standard pills per user request).
- Polish responsive layouts on mobile devices.
