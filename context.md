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
7. **Developer Utilities Sub-layout (`ProjectsSection.tsx`):** A visually distinct grid layout featuring compact card designs for utilities like FocusFlow and CSS Gradient Generator.
8. **Cursor-Linked Ambient Backlight (`App.tsx`):** A global mouse-tracking radial backlight illuminating glass panels from behind.
9. **Spotlight Command Palette Trigger (`HeroSection.tsx`):** A mock Cmd+K search-bar placeholder in the Hero section which triggers the navigation command palette.
10. **Magnetic Cursor Proximity Chips (`MagneticChip.tsx`):** Skill items rendered as standalone translucent pills that translate towards the cursor on hover using spring physics.
11. **3D Tilt Bento Grid Achievements (`AchievementsSection.tsx`, `TiltCard.tsx`):** Asymmetric achievements Bento Grid with 3D cursor tilt, coordinate-linked glare overlays, and colored mesh gradients (purple/blue cosmic, and red/gold).
12. **Cinematic Storytelling scroll-link (`ScrollFadeText.tsx`):** Section transition sentences that fade out and float upwards as the page is scrolled.

## Project Structure
```text
portfolio/
├── content.json          # Single source of truth for portfolio data
├── context.md            # Project overview and status documentation
├── frontend/
│   ├── index.html        # Entry HTML
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── src/
│       ├── main.tsx      # React root
│       ├── App.tsx       # Main layout & Theme toggle with ambient backlight tracking
│       ├── index.css     # CSS Variables, Neural Glass, and interactive glow rules
│       ├── store/        # Zustand state
│       ├── data/         # Symlink/copy of content.json
│       ├── components/
│       │   ├── 3d/       # React Three Fiber components
│       │   ├── sections/ # Page sections (Hero, About, Projects, Achievements, etc.)
│       │   └── ui/       # UI elements (ScrollFadeText, MagneticChip, TiltCard, GithubFeed)
```

## Current State & Recent Fixes
- **UI/UX Refactor**: Implemented a comprehensive high-fidelity micro-interactions package featuring 3D tilt effects, proximity pull vectors on skill tags, tactile active states (`scale: 0.97`) on all CTAs, and coordinate-linked ambient light overlays.
- **Glassmorphism**: Adjusted glass-panel cards to use exact opacities (`rgba(255, 255, 255, 0.05)` for light mode, `rgba(39, 39, 42, 0.4)` for dark mode).
- **Compilation & Verification**: All components are validated and compile successfully under TypeScript strict check, maintaining a 60fps rendering path.

## Next Steps / Backlog
- Replace the primitive 3D shape (`Scene.tsx`) with a final customized `.glb` avatar.
- Polish responsive layouts on mobile devices.
