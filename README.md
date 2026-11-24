# Pratik Parihar — Personal Portfolio

A modern, high-performance personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, and Three.js.

## 🚀 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, Custom CSS-variable design system (`index.css`)
- **Animations:** Framer Motion (spring physics, magnetic chip interactions, accordion state handling)
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **State Management:** Zustand
- **Contact:** Web3Forms Serverless API (direct-to-email form submissions with zero backend maintenance)

---

## ✨ Features

- **Spotlight Achievements:** 3D tilt cards displaying academic honors (Devang Mehta IT Award 3× Rank 1, ISRO SAC selection, 9.51 CGPA, TFWS 100% Merit Waiver).
- **Engineering-First Projects Section:**
  - One-at-a-time interactive accordion view with low cognitive load.
  - Aligned repository and live preview actions.
  - Magnetic skill tags with devicon branding and physics tracking.
  - Documented engineering decisions and architectural rationale for each project.
- **Magnetic Skills Grid:** Proximity spring-pull skill pills categorized by language, framework, database, and tool.
- **Global Smart Skip Navigation:** Floating bottom-right quick navigation button that scrolls sequentially through sections and returns to the top.
- **Serverless Contact Form:** Submissions sent directly to Gmail via Web3Forms with client-side validation and feedback states.
- **Responsive & Dark/Light Mode:** Full runtime color token switching with high contrast and smooth scroll behavior.

---

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PratikParihar24/portfolio.git
   cd portfolio/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
portfolio/
├── content.json          # Mirrored content data
├── context.md            # In-depth architectural context
├── README.md             # Project documentation
└── frontend/
    ├── public/
    │   └── resume.pdf    # Resume PDF asset
    └── src/
        ├── components/
        │   ├── 3d/       # 3D Scene & lighting
        │   ├── sections/ # Hero, About, Projects, Skills, Achievements, Contact
        │   └── ui/       # TiltCard, MagneticChip, ScrollFadeText
        ├── data/
        │   └── content.json  # Primary data source
        ├── pages/        # Home and Resume views
        └── store/        # Zustand application store
```
