# Repository Architecture & Hygiene Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up the repository structure, remove duplicate and legacy clutter, decouple static token and showcase data, and decompose the two ~35 KB showcase monoliths into focused subcomponents with zero visual or behavioral regressions.

**Architecture:** Standardize all components under `src/components/` (eliminating `src/React/`), extract data objects into `src/data/`, and break monolithic showcase pages into subcomponents under `src/components/pyshare/` and `src/components/cypher/` assembled by concise orchestrators.

**Tech Stack:** Next.js 16 (App Router / Turbopack), React 19, TypeScript, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-10-25-repository-refactor-design.md`

## Global Constraints
- Work must happen on a new feature branch (`refactor/repo-architecture`), not directly on `master` or `main`.
- 100% strict 1:1 behavioral and visual parity: no UI redesigns, no altered styles, no new modals, no content changes.
- Every task must pass `npm run typecheck` and end in an atomic, conventional git commit without `Co-authored-by:` trailers.
- All routes (`/`, `/_not-found`, `/projects/cypher`, `/projects/pyshare`) must continue to prerender statically with zero build errors.

## Review Focus
- Breakage of image paths or blur placeholders during import reorganizations.
- Missing React client directives (`"use client"`) in newly extracted interactive subcomponents (carousels, command tables).
- Regressions in keyboard navigation, thumbnail clicking, or auto-carousel timers in showcase galleries.
- Unresolved import paths following the removal of `src/React/`.
- Unintended changes to Tailwind classes or CSS variables during JSX extraction.

---

### Task 1: Branch Creation & Repository Hygiene

**Files:**
- Create: Git branch `refactor/repo-architecture`
- Move: `src/React/SkillsList.tsx` -> `src/components/SkillsList.tsx`
- Move: `src/React/LikeButton.tsx` -> `src/components/LikeButton.tsx`
- Delete: `src/React/`
- Delete: `agent/` (duplicate unhidden copy of `.agents/`)
- Delete: Unused legacy SVGs in `public/svg/` (`bash.svg`, `CSS3.svg`, `git.svg`, `HTML5.svg`, `javaScript.svg`, `mysql.svg`, `nodejs.svg`, `react.svg`, `supabase.svg`, `typeScript.svg`)
- Delete: Untracked `tsconfig.tsbuildinfo`
- Modify: `src/components/Home.tsx` (update SkillsList import to `@/components/SkillsList`)
- Modify: `src/components/Footer.tsx` (update LikeButton import to `@/components/LikeButton`)

**Interfaces:**
- Consumes: Existing components and assets
- Produces: Clean unified `src/components/` root and clean `public/svg/` containing only actively used assets (`next.svg`, `tailwindcss.svg`, `vercel.svg`, and `tech/*`)

- [ ] **Step 1: Create and switch to refactor branch**
Run: `git checkout -b refactor/repo-architecture`

- [ ] **Step 2: Clean up duplicate and unused files**
Run:
```powershell
Remove-Item -Recurse -Force agent
Remove-Item -Force tsconfig.tsbuildinfo -ErrorAction SilentlyContinue
Remove-Item -Force public/svg/bash.svg, public/svg/CSS3.svg, public/svg/git.svg, public/svg/HTML5.svg, public/svg/javaScript.svg, public/svg/mysql.svg, public/svg/nodejs.svg, public/svg/react.svg, public/svg/supabase.svg, public/svg/typeScript.svg -ErrorAction SilentlyContinue
```

- [ ] **Step 3: Move components from `src/React/` to `src/components/` and delete `src/React/`**
Run:
```powershell
Move-Item src/React/SkillsList.tsx src/components/SkillsList.tsx
Move-Item src/React/LikeButton.tsx src/components/LikeButton.tsx
Remove-Item -Recurse -Force src/React
```

- [ ] **Step 4: Update import paths in `Home.tsx` and `Footer.tsx`**
Update `Home.tsx`: `import SkillsList from "@/components/SkillsList";`
Update `Footer.tsx`: `import LikeButton from "@/components/LikeButton";`

- [ ] **Step 5: Verify TypeScript compilation**
Run: `npm run typecheck`
Expected: 0 errors

- [ ] **Step 6: Commit changes**
```bash
git add .
git commit -m "refactor(structure): unify components directory and clean asset clutter"
```

---

### Task 2: Data Extraction & Decoupling

**Files:**
- Create: `src/data/terminalSnippets.ts`
- Create: `src/data/pyshareData.ts`
- Create: `src/data/cypherData.ts`
- Modify: `src/components/CodeTerminal.tsx`

**Interfaces:**
- Produces in `src/data/terminalSnippets.ts`:
  - `export interface CodeToken { text: string; color: string }`
  - `export interface CodeLine { num: number; tokens: CodeToken[] }`
  - `export interface CodeSnippet { filename: string; tabLabel: string; category: string; description: string; lines: CodeLine[]; output: { text: string; badge: string; badgeColor: string } }`
  - `export const codeSnippets: Record<string, CodeSnippet>`
- Produces in `src/data/pyshareData.ts`:
  - `pyshareScreenshots`, `pyshareArchitecture`, `pyshareComparisonModes`, `pyshareQuickSteps`
- Produces in `src/data/cypherData.ts`:
  - `cypherScreenshots`, `cypherVoiceCommands`, `cypherArchitecture`, `cypherQuickSteps`

- [ ] **Step 1: Extract code snippet data into `src/data/terminalSnippets.ts`**
Move lines 1-404 of `CodeTerminal.tsx` into `src/data/terminalSnippets.ts`.

- [ ] **Step 2: Update `CodeTerminal.tsx` to import from `src/data/terminalSnippets`**
Import `codeSnippets`, `CodeSnippet`, `CodeLine`, `CodeToken` from `@/data/terminalSnippets`.

- [ ] **Step 3: Extract PyShare showcase static data into `src/data/pyshareData.ts`**
Move screenshot arrays, architecture card objects, mode comparison arrays, and quickstart steps from `PyShareShowcase.tsx` into `src/data/pyshareData.ts`.

- [ ] **Step 4: Extract Cypher showcase static data into `src/data/cypherData.ts`**
Move screenshot arrays, voice command protocols, system architecture card objects, and setup steps from `CypherShowcase.tsx` into `src/data/cypherData.ts`.

- [ ] **Step 5: Verify TypeScript compilation**
Run: `npm run typecheck`
Expected: 0 errors

- [ ] **Step 6: Commit changes**
```bash
git add src/data/ src/components/CodeTerminal.tsx
git commit -m "refactor(data): decouple static showcase and terminal data into data models"
```

---

### Task 3: PyShare Showcase Component Decomposition

**Files:**
- Create: `src/components/pyshare/PyShareGallery.tsx`
- Create: `src/components/pyshare/PyShareArchitecture.tsx`
- Create: `src/components/pyshare/PyShareModes.tsx`
- Create: `src/components/pyshare/PyShareQuickStart.tsx`
- Modify: `src/components/PyShareShowcase.tsx`

**Interfaces:**
- Consumes: Data from `@/data/pyshareData`
- Produces in `PyShareShowcase.tsx`: Orchestrator (<160 lines) importing and rendering the subcomponents in identical sequence.

- [ ] **Step 1: Extract `PyShareGallery.tsx`**
Extract the interactive carousel gallery (timer, auto-progress, keyboard navigation, thumbnail strip, and image layers) into `"use client"` component `src/components/pyshare/PyShareGallery.tsx`.

- [ ] **Step 2: Extract `PyShareArchitecture.tsx`**
Extract the 4 Core Architecture cards into `src/components/pyshare/PyShareArchitecture.tsx`.

- [ ] **Step 3: Extract `PyShareModes.tsx`**
Extract the Web vs Desktop comparison cards and feature lists into `src/components/pyshare/PyShareModes.tsx`.

- [ ] **Step 4: Extract `PyShareQuickStart.tsx`**
Extract the 3-step Quick Start guide into `src/components/pyshare/PyShareQuickStart.tsx`.

- [ ] **Step 5: Simplify `PyShareShowcase.tsx`**
Compose the hero header, `PyShareGallery`, `PyShareModes`, `PyShareArchitecture`, `PyShareQuickStart`, and CTA banner into `PyShareShowcase.tsx`.

- [ ] **Step 6: Verify TypeScript and static build**
Run: `npm run typecheck`
Run: `npm run build`
Expected: 0 errors, `/projects/pyshare` prerenders successfully.

- [ ] **Step 7: Commit changes**
```bash
git add src/components/pyshare/ src/components/PyShareShowcase.tsx
git commit -m "refactor(pyshare): decompose PyShare showcase into focused subcomponents"
```

---

### Task 4: Cypher Showcase Component Decomposition

**Files:**
- Create: `src/components/cypher/CypherGallery.tsx`
- Create: `src/components/cypher/CypherArchitecture.tsx`
- Create: `src/components/cypher/CypherCommands.tsx`
- Create: `src/components/cypher/CypherQuickStart.tsx`
- Modify: `src/components/CypherShowcase.tsx`

**Interfaces:**
- Consumes: Data from `@/data/cypherData`
- Produces in `CypherShowcase.tsx`: Orchestrator (<160 lines) importing and rendering the subcomponents in identical sequence.

- [ ] **Step 1: Extract `CypherGallery.tsx`**
Extract the HUD state carousel gallery (auto-progress, state indicators, keyboard navigation, thumbnail strip) into `"use client"` component `src/components/cypher/CypherGallery.tsx`.

- [ ] **Step 2: Extract `CypherArchitecture.tsx`**
Extract the 4 System Architecture cards (Arc Reactor Core, 32-Band Visualizer, 12-Segment LED Telemetry, Credentials Vault) into `src/components/cypher/CypherArchitecture.tsx`.

- [ ] **Step 3: Extract `CypherCommands.tsx`**
Extract the Voice Command Protocol matrix table into `src/components/cypher/CypherCommands.tsx`.

- [ ] **Step 4: Extract `CypherQuickStart.tsx`**
Extract the 3-step Zero-Friction Setup guide into `src/components/cypher/CypherQuickStart.tsx`.

- [ ] **Step 5: Simplify `CypherShowcase.tsx`**
Compose the hero header, `CypherGallery`, `CypherArchitecture`, `CypherCommands`, `CypherQuickStart`, and CTA banner into `CypherShowcase.tsx`.

- [ ] **Step 6: Verify TypeScript and static build**
Run: `npm run typecheck`
Run: `npm run build`
Expected: 0 errors, `/projects/cypher` prerenders successfully.

- [ ] **Step 7: Commit changes**
```bash
git add src/components/cypher/ src/components/CypherShowcase.tsx
git commit -m "refactor(cypher): decompose Cypher showcase into focused subcomponents"
```

---

### Task 5: End-to-End Build Verification & PR Preparation

**Files:**
- Verify: Full repository integrity across all pages and routes

- [ ] **Step 1: Run comprehensive TypeScript check**
Run: `npm run typecheck`
Expected: Exit code 0, 0 type errors.

- [ ] **Step 2: Run full production Next.js build**
Run: `npm run build`
Expected: All routes prerendered (`/`, `/_not-found`, `/projects/cypher`, `/projects/pyshare`), Exit code 0.

- [ ] **Step 3: Push feature branch to origin**
Run: `git push -u origin refactor/repo-architecture`

- [ ] **Step 4: Create Pull Request targeting master**
Open PR from `refactor/repo-architecture` into `master` for final review.
