# ROCYGAMING Portfolio

Personal portfolio website built with React + Vite, styled with Tailwind CSS, and a custom Three.js WebGL background.

## Tech Stack

- React (Vite)
- Tailwind CSS (PostCSS)
- Three.js
- ESLint

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Run Dev Server

```bash
npm run dev
```

### 3) Production Build

```bash
npm run build
```

### 4) Preview Production Build

```bash
npm run preview
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Project Structure

```text
src/
	components/        # UI + effects (includes ThreeBackground)
	sections/          # Page sections (Hero/About/Works/etc.)
	config/siteData.js # Central content/config for the site
	hooks/             # Reusable hooks
	assets/            # Images
```

## Customize Content

Most text/content is driven by a single config file:

- Edit `src/config/siteData.js` to update:
	- hero text + CTA links
	- ticker items
	- projects
	- skills
	- contact email + social links

## Notes

- Public assets are served from the root path.
	- Example: use `/icons-pfp.png` (not `/public/icons-pfp.png`).

## Deployment

This is a standard Vite app; you can deploy the `dist/` output to any static host.

Example (GitHub Pages / Netlify / Vercel):

1. Run `npm run build`
2. Deploy the generated `dist/` directory

## License

This project is for personal portfolio use.
