# Pratik Pattanayak - Portfolio

> Highly customizable, performant, and interactive personal portfolio for Pratik Pattanayak, a Backend & AI Engineer.

![Deploy Status](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)
[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

---

[Live Demo](https://darkminimal.vercel.app)

## **About Me**
I'm a Backend Engineer and AWS-certified ML practitioner specializing in building scalable backend systems, analytical APIs, and production-grade Generative AI integrations with Python and TypeScript. I have extensive experience with Next.js, React Native, and AI Agents for complex automated workflows.

## **Featured Projects**
- **Cypher**: A fast, multi-model AI assistant that converts natural language into reliable system-level automation using Gemini 1.5 Flash.
- **PyShare**: A custom backend networking tool for instant, offline PC-to-mobile file transfer over local Wi-Fi via pure Python socket programming.
- **Riff (Dirtcube Interactive)**: Engineered complete Next.js admin dashboards and precise V8 telemetry systems for an Expo React Native app.

## **Tech Stack**  
- **Core Engine:** Astro
- **Frontend & Interactivity:** React, TypeScript, Tailwind CSS
- **Backend Services:** Firebase (Realtime Database for interactions)
- **Deployment:** Vercel

## **Project Structure**
```text
public/
├── svg/tech/       # SVGs for the scrolling marquee
└── ...             # Static assets (Resume, icons)
src/
├── assets/         # Optimized images
├── components/     # Astro components (hero, projects, experience, contact)
├── data/
│    └── profile.ts # Single Source of Truth for all portfolio content
├── layouts/
│    └── Layout.astro # Base HTML layout and SEO tags
├── React/          # Interactive React Islands
│    ├── LetterGlitch.tsx
│    ├── LikeButton.tsx
│    └── SkillsList.tsx
└── pages/
     └── index.astro
```

## **Local Configuration** 

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **pnpm**

1. Clone the repository:  
```bash
git clone https://github.com/pattanayakpratik/my_portfolio.git
```
2. Install dependencies:
```bash  
npm install
```
3. Set up environment variables (Optional, for Realtime Likes):
Create a `.env` file in the root and add your Firebase credentials:
```env
PUBLIC_FIREBASE_API_KEY=...
PUBLIC_FIREBASE_AUTH_DOMAIN=...
PUBLIC_FIREBASE_DATABASE_URL=...
PUBLIC_FIREBASE_PROJECT_ID=...
PUBLIC_FIREBASE_STORAGE_BUCKET=...
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
PUBLIC_FIREBASE_APP_ID=...
```
*(If `.env` is not provided, the site gracefully falls back to local component states.)*

4. Start the development server:
```bash  
npm run dev
```

## **Deployment**
This project is built statically with Astro and deployed directly to Vercel. 
Simply link the repository to your Vercel account, set the environment variables, and it will deploy automatically on push.
