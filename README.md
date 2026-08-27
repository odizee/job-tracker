# Frontend Job Tracker

A small React + Vite app for logging daily frontend job applications
(Nigeria, Africa, and remote-anywhere roles). Application data is stored
locally in the browser via **IndexedDB** (through the `idb` library) —
nothing leaves your machine.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## What's inside

- `src/data/picks.js` — the seed list of "Today's picks" job postings.
  Edit this file to refresh with new postings any time.
- `src/db.js` — the IndexedDB wrapper (add/update/delete/list applications).
- `src/App.jsx` + `src/components/` — the UI: stats, picks, add-form, log table.

## Build for production

```bash
npm run build
npm run preview
```
