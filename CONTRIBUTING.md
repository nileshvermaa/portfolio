# Contributing to NILESH.SYS

Thanks for your interest! This is a personal portfolio project but contributions — bug fixes, accessibility improvements, or new retro features — are welcome.

---

## Quick start

```bash
# Fork → clone your fork
git clone https://github.com/<your-username>/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy env template
cp .env.example .env.local
# Optional: add a Web3Forms key for the contact form. Without it, the form
# runs in simulation mode — fine for local development.

# Start the dev server
npm run dev
# → http://localhost:5173
```

---

## Project conventions

### Code style

- **ESLint** is configured (`eslint.config.js`). Run `npm run lint` before committing.
- Components use `.jsx`, plain modules use `.js`.
- Hooks live in `src/hooks/`, data files in `src/content/`, page-level components in `src/pages/`.
- Avoid installing heavy new dependencies for small UI changes — the retro aesthetic is intentionally lightweight.

### Styling

- Styles use **Tailwind CSS utility classes** combined with **CSS custom properties** defined in `src/styles/themes.css`.
- Theme tokens always follow the `--retro-*` prefix. Add new tokens there, not as hard-coded hex values in JSX.
- New animations go in `src/styles/animations.css`.
- Respect `prefers-reduced-motion` — any new animation should be wrapped in a `@media (prefers-reduced-motion: no-preference)` block or disabled in the existing `reduce` block at the bottom of `animations.css`.

### Themes

When adding a new UI element, test it against **all four themes**:

| Theme key | Data attribute | Colour scheme |
|---|---|---|
| `terminal` | `data-theme="terminal"` | Black bg + green fg |
| `amber` | `data-theme="amber"` | Dark bg + amber fg |
| `mono` | `data-theme="mono"` | White bg + black fg |
| `win95` | `data-theme="win95"` | Grey bg + classic Win95 |

Switch themes via the **View** menu in the header.

### Content updates

All portfolio data lives in `src/content/`:

| File | What it controls |
|---|---|
| `projects.js` | Project cards (Projects page) |
| `skills.js` | Skills grid (About page) |
| `timeline.js` | Career / education timeline |
| `currently.js` | "Currently" widget on the home sidebar |

---

## Git workflow

1. Create a branch off `main`: `git checkout -b fix/theme-switcher-amber`
2. Make your changes and verify with `npm run lint && npm run build`.
3. Commit with a clear message: `fix: amber theme not applying on mobile`.
4. Open a pull request against `main` and fill in the PR template.

---

## Reporting bugs

Use the **[Bug Report](https://github.com/nileshcf/portfolio/issues/new?template=bug_report.yml)** issue template. Include:
- The URL / page affected
- Steps to reproduce
- Browser and device
- Console errors (F12 → Console)

---

## Requesting features

Open a **[Feature Request](https://github.com/nileshcf/portfolio/issues/new?template=feature_request.yml)** issue. The retro/terminal aesthetic is intentional — new features should fit that style.

---

## Local production build

```bash
npm run build
npm run preview
# → http://localhost:4173
```

This is the closest approximation to what Vercel deploys. Always verify the production build before opening a PR.

---

## CI

Every push and pull request runs the **CI workflow** (`.github/workflows/ci.yml`):

1. `npm ci` — clean install
2. `npm run lint` — ESLint
3. `npm run build` — Vite production build

PRs to `main` must have a passing CI run before merge.
