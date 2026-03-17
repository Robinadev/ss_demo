# Anonymous Reporting Platform

A React + Vite frontend for an anonymous reporting platform (UI inspired by the original Figma file).

**Tech stack:** React, Vite, Tailwind CSS, Supabase (client), Radix UI

**Quick start**

Prerequisites:

- Node.js (recommended >= 18)
- npm (or yarn/pnpm)

Install dependencies (project root):

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

If you prefer to work inside the `frontend` folder (it contains a standalone Vite app):

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
# then preview the build locally
npx vite preview
```

Notes

- The repository contains a production `build/` folder with compiled assets (HTML, CSS, JS) ready to serve.
- App source is in `src/` and `frontend/src/` (components, pages, styles).
- Tailwind configuration: `tailwind.config.js`.
- Vite configuration: `vite.config.ts`.
- Supabase-related client code and functions live under `supabase/` and `frontend/src/supabase` — set your environment secrets before running (see below).

Environment / Supabase

- The app expects standard Supabase variables (for example `SUPABASE_URL` and `SUPABASE_ANON_KEY`) to be provided via environment variables or a `.env` file in the working folder. Check `frontend/src/supabase` for exact keys used by the project.

Project layout (important paths)

- `frontend/` — secondary Vite app with its own package.json and source.
- `src/` — primary app source (components, pages, styles).
- `build/` — compiled production site (served as static files).
- `supabase/` — serverless functions and Supabase utilities.

Troubleshooting

- If dependencies fail to install, ensure Node.js version is compatible and try clearing cache: `npm cache clean --force`.
- If dev server port is in use, run `npx kill-port 5173` (or change Vite port in `vite.config.ts`).

Contributing

- Open issues or submit PRs against this repository. Keep changes focused and include a short description of what you changed.

License

- Check with the repository owner for licensing information.

Contact

- Refer to the Figma design linked above for UI references and assets.
