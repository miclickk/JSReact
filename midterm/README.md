# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


# 3D Asset Library — React SPA (Midterm Project)

A Single Page Application for browsing, filtering, creating, and managing 3D architectural visualization assets.

## Features
- **Simulated Async API:** Uses Promises, artificial network delays, error simulation, and `localStorage` initialized with 115 records.
- **Search, Filter & Sort:** Real-time search by title, filtering by Category and Render Engine, and sorting by Price or Polygon count.
- **Pagination:** Client-side pagination displaying 12 items per page.
- **CRUD & Async Details:** Create new assets via a controlled form, delete items, inspect full details asynchronously, and toggle scene status.
- **Race Condition & Identity Handling:** Uses `useEffect` cleanup flags and component `key` resetting (`key={selectedId}`).

## Component Architecture
1. `App.jsx` — Main container, global list state, filter/sort/pagination derived state.
2. `FilterBar.jsx` — Controlled inputs for search, category, render engine, and sorting.
3. `AssetCard.jsx` — Reusable presentational card for list items.
4. `Pagination.jsx` — Page navigation controls.
5. `AssetForm.jsx` — Controlled form with isolated local state for creating new assets.
6. `AssetDetails.jsx` — Asynchronous detail view with race-condition protection and local session state.

## Run Locally
1. `npm install`
2. `npm run dev`