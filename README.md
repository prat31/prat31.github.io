# me.pratcode.dev

Personal site of Pratyush Prasad: a single page with intro, about, projects, reading and contact, and a progress rail that tracks where you are.

Plain HTML, CSS and JavaScript, bundled with [Vite](https://vitejs.dev/) and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Updating content

All content (bio, stack, projects, books) lives in [`src/data.js`](src/data.js). Book covers go in `public/images/` (about 240px wide JPEGs keep the page light).

## Development

```bash
npm install
npm run dev
npm run build
```
