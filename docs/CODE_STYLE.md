# CODE_STYLE.md

## 1. Purpose
This document defines the coding conventions, architecture standards, and design system rules for the **Frank Patel Portfolio** project.
All manual contributions and AI-generated code must preserve these conventions.

## 2. Technology Stack
- **Structure:** Semantic HTML5 (`header`, `main`, `section`, `article`, `footer`, `nav`).
- **Styling:** Modular Vanilla CSS (CSS Custom Properties design tokens, Bootstrap grid utilities).
- **Interactivity:** Vanilla JavaScript (ES6+, DOM API, IntersectionObserver, async/await).
- **Libraries & Plugins:** Phosphor Icons, AOS (Animate on Scroll), Swiper, GSAP, PureCounter.

## 3. Stylesheet Hierarchy & Precedence
Stylesheets in `<head>` must load in this strict sequence:
1. `assets/css/bootstrap.min.css` (Base grid)
2. `assets/css/swiper-bundle.css`, `magnific-popup.css`, `aos.css` (Vendor styles)
3. `assets/css/main.css` (Core theme & site layout)
4. `assets/css/production-enhancements.css` (Production enhancements & bento layouts)
5. `assets/css/usability-fixes.css` (**Final cascade layer** — single source of truth for typography scale, design tokens, button consolidation, and WCAG contrast).

## 4. Design Tokens & Color System
Always reference tokens from `:root` in `usability-fixes.css`:
- **Typography Scale:**
  - `--fs-1`: `0.875rem` (captions, tags, chips)
  - `--fs-2`: `1rem` (body, buttons)
  - `--fs-3`: `1.125rem` (lead body)
  - `--fs-4`: `1.25rem` (card titles)
  - `--fs-5`: `1.5rem` (subheadings)
  - `--fs-6`: `2.5rem` (stats counters)
  - `--fs-7`: `3rem` (section titles)
- **Radii:**
  - `--radius-sm`: `4px`
  - `--radius-md`: `8px` (buttons, inputs)
  - `--radius-lg`: `12px` (small cards)
  - `--radius-xl`: `16px` (bento cards)
  - `--radius-pill`: `9999px` (tags, filter chips)
- **Colors:**
  - Canvas Light: `#ffffff`, Canvas Neutral: `#fafafa`, Canvas Dark: `#0a0a0a`
  - Dark Surface Cards: `#141414` (border `#242424`)
  - Ink Typography: `#02080d`, Muted Copy: `#52525b` / `#a1a1aa`
  - Brand Accent: `#ff4500` / `#ff5722`, Accent Hover: `#ff914d`

## 5. JavaScript Conventions
- **DOM Access:** Cache element references at the top of functions. Use `querySelector` / `querySelectorAll`.
- **Defensive Guard Clauses:** Always verify element existence (`if (!form) return;`) before adding listeners.
- **Event Listeners:** Wrap logic in `document.addEventListener("DOMContentLoaded", ...)`.
- **Accessibility:**
  - Maintain interactive states (`aria-pressed`, `aria-expanded`, `aria-hidden`, `aria-live`).
  - Keep keyboard navigation intact (`:focus-visible` with 2–3px offset).
- **Modern Syntax:** Prefer `const`/`let`, arrow functions, template literals, and `async/await`. Avoid legacy jQuery where plain JavaScript is cleaner.

## 6. HTML & Semantics
- Every page must have exactly one `<h1>`.
- All `<img>` tags must have descriptive `alt` attributes (or `aria-hidden="true"` with `alt=""` if strictly decorative).
- Use `loading="lazy"` and `decoding="async"` on images below the fold.
- Interactive elements must use `<button>` or `<a>` — never raw `<div>` with `click` handlers.

## 7. AI Agent Checklist Before Finishing
- Ensure no inline styles are added unless strictly necessary for dynamic positioning.
- Ensure all color changes maintain WCAG AA contrast (minimum 4.5:1 for normal text).
- Check mobile responsiveness (`< 768px`, `< 992px`, `< 1200px`).
- Run code clean-up: no dead code, console logs, or unformatted lines.
