# Design Document: Repository Architecture & Hygiene Refactor

- **Date**: 2026-10-25
- **Author**: Pratik Pattanayak & Antigravity
- **Topic**: Portfolio Repository Cleanup, Data Decoupling & Modularization
- **Target Version**: `my_portfolio` v0.0.2
- **Status**: Approved Strategy (Option A) — Ready for Planning

---

## 1. Intent & Context

Over multiple rapid iterations, new features (Linear cursor spotlight, IST clock, animated counters, project skill-filtering, direct download endpoints, and showcase pages) were added incrementally. While fully functional in production, the codebase accumulated architectural and organizational technical debt:
1. **Directory Split & Legacy Clutter**: Components were split across `src/components/` and `src/React/`. Root directories held accidental skill duplicates (`agent/skills/` vs `.agents/skills/`), unignored cache files (`tsconfig.tsbuildinfo`), and legacy unused SVGs.
2. **Monolithic Showcase Files**: `PyShareShowcase.tsx` (788 lines / 35.4 KB) and `CypherShowcase.tsx` (735 lines / 33.5 KB) bundle huge data definitions, interactive galleries, architecture diagrams, and quickstart cards all into single files.
3. **Data-Logic Entanglement**: `CodeTerminal.tsx` (607 lines) hardcodes 400+ lines of raw token objects inside the UI component file instead of decoupling them into a typed data model.

This refactor reorganizes the repository into clean, modular layers while preserving 100% of the UI, functionality, and performance with **zero visual or behavioral regression**.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Strict 1:1 Zero-Regression**: Guarantee that `npm run build`, `npm run typecheck`, and all static page outputs (`/`, `/projects/pyshare`, `/projects/cypher`) remain 100% identical in appearance, layout, styling, and behavior.
- **Hygiene**: Clean up untracked/duplicate directories, root artifacts, and unused legacy SVGs.
- **Unified Structure**: Standardize all components inside `src/components/` and eliminate `src/React/`.
- **Data Decoupling**: Separate data structures (code snippets, showcase specs, voice command tables, screenshots metadata) into dedicated, typed files under `src/data/`.
- **Component Decomposition**: Decompose the two large showcase pages into focused, readable subcomponents (<200 lines each).

### Non-Goals
- Adding new UI features, full-screen modals, or search filters.
- Modifying Next.js runtime configurations or deployment URLs.
- Rewriting Git history.

### Anti-Goals
- Breaking any existing asset paths or image blurDataURLs.
- Introducing over-engineered abstractions or third-party state libraries.

---

## 3. Approaches Considered & Selection

### Approach A: Comprehensive Modular Architecture & Repo Hygiene (Selected)
- Remove duplicate root clutter (`agent/skills/`, unneeded root assets).
- Migrate `src/React/` into `src/components/`.
- Clean up legacy unused SVGs in `public/svg/` that are shadowed by `public/svg/tech/`.
- Decouple static data in `CodeTerminal`, `PyShareShowcase`, and `CypherShowcase` into `src/data/`.
- Break monolithic showcase pages into clean, dedicated subcomponents.
- **Why Selected**: Directly addresses all root architectural debt, makes future enhancements friction-free, and keeps all components under 200 lines.

### Approach B: Surface-Level Cleanup Only (Rejected)
- Only remove root clutter and delete unused files, leaving the 35 KB showcase monoliths untouched.
- **Why Rejected**: Leaves 70%+ of the technical debt in place; future changes to showcase pages would still be cumbersome and error-prone.

---

## 4. Detailed Chunk Execution Plan

### Chunk 1: Directory Hygiene & Asset Cleanup
- Delete accidental duplicate directory `agent/skills/` (retaining canonical `.agents/skills/`).
- Ensure `.gitignore` cleanly handles build caches (`tsconfig.tsbuildinfo`).
- Remove obsolete legacy SVGs in `public/svg/` that are not referenced in the code (`bash.svg`, `CSS3.svg`, `git.svg`, `HTML5.svg`, `javaScript.svg`, `mysql.svg`, `nodejs.svg`, `react.svg`, `supabase.svg`, `typeScript.svg`), keeping the three actively used footer icons (`next.svg`, `tailwindcss.svg`, `vercel.svg`).
- Move `src/React/SkillsList.tsx` and `src/React/LikeButton.tsx` into `src/components/`, delete `src/React/`, and update imports in `Home.tsx` and `Footer.tsx`.

### Chunk 2: Data Extraction & Decoupling
- Create `src/data/terminalSnippets.ts`:
  - Define `CodeToken`, `CodeLine`, `CodeSnippet` interfaces.
  - Export `codeSnippets` record containing Python, ML, Groq, and Shell pipelines.
- Create `src/data/pyshareData.ts`:
  - Export `pyshareScreenshots`, `pyshareArchitecture`, `pyshareComparisonModes`, `pyshareQuickSteps`.
- Create `src/data/cypherData.ts`:
  - Export `cypherScreenshots`, `cypherVoiceCommands`, `cypherArchitecture`, `cypherQuickSteps`.
- Update `CodeTerminal.tsx` to import from `src/data/terminalSnippets.ts`, immediately reducing its size from 607 lines to ~180 lines with 0 behavioral change.

### Chunk 3: Showcase Component Decomposition (1:1 Mapping)
- **PyShare Subcomponents** (under `src/components/pyshare/`):
  - `PyShareGallery.tsx`: 1:1 extraction of the screenshot carousel with auto-switch timer, thumbnail strip, and keyboard navigation.
  - `PyShareArchitecture.tsx`: 1:1 extraction of the 4 Core Architecture cards (WebRTC, HTTP 206, Clipboard, Dual-Grace PIN).
  - `PyShareModes.tsx`: 1:1 extraction of the Web vs Desktop operation modes comparison.
  - `PyShareQuickStart.tsx`: 1:1 extraction of the 3-step Quick Start guide.
  - `PyShareShowcase.tsx`: Clean orchestrator combining the above (<160 lines).
- **Cypher Subcomponents** (under `src/components/cypher/`):
  - `CypherGallery.tsx`: 1:1 extraction of the HUD State carousel with auto-switch and state badges.
  - `CypherArchitecture.tsx`: 1:1 extraction of the 4 System Architecture cards (Arc Reactor Core, 32-Band Visualizer, 12-Segment LED Telemetry, Credentials Vault).
  - `CypherCommands.tsx`: 1:1 extraction of the Voice Command Protocol table.
  - `CypherQuickStart.tsx`: 1:1 extraction of the 3-step Zero-Friction Setup guide.
  - `CypherShowcase.tsx`: Clean orchestrator combining the above (<160 lines).

### Chunk 4: Build Verification & Git Commit Sequence
- Run `npm run typecheck` to verify all TypeScript interfaces.
- Run `npm run build` to ensure Next.js Turbopack compiles all routes cleanly (`/`, `/_not-found`, `/projects/cypher`, `/projects/pyshare`).
- Verify production bundle size and prerender status.
- Commit changes using clean, conventional commit messages:
  1. `refactor(structure): unify components directory and clean asset clutter`
  2. `refactor(data): decouple static showcase and terminal data into data models`
  3. `refactor(showcase): decompose monolithic showcase pages into modular components`
  4. `test(build): verify full TypeScript and Next.js static build`

---

## 5. Architectural Calls Made

- **Strict 1:1 Scope**: No new features or UI redesigns are introduced. All markup, classes, styles, and data are preserved exactly as-is.
- **Dedicated Galleries**: Rather than forcing PyShare and Cypher into a generic shared gallery abstraction that could introduce props drift, each showcase uses a clean dedicated subcomponent (`PyShareGallery.tsx` and `CypherGallery.tsx`) tailored to its respective badges and captions.
- **Orchestrator Pattern**: Main showcase files (`PyShareShowcase.tsx` and `CypherShowcase.tsx`) remain the page-level components consumed by App Router (`/projects/pyshare` and `/projects/cypher`), cleanly assembling their subcomponents.
