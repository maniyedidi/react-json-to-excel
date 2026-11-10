# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`react-json-to-excel` is a small npm library exposing a React button (`JsonToExcel`) and a helper (`exportToExcel`) that convert JSON to an `.xlsx` download. All logic lives in [src/component/json-to-excel/index.js](src/component/json-to-excel/index.js); [src/index.js](src/index.js) just re-exports it.

## Commands

- `npm run build-lib` — Rollup 4 build ([rollup.config.mjs](rollup.config.mjs)) to `dist/index.js` (cjs) and `dist/index.es.js` (es). `dist/` is gitignored.
- `npm test` — Vitest + Testing Library (`src/**/*.test.jsx`, jsdom). Single test: `npx vitest run -t "name"`.
- `npm run storybook` / `npm run build-storybook` — Storybook 10 (react-vite), CSF stories in `src/stories/`. `storybook-static/` is gitignored.
- No linter configured.

## Architecture notes

- Source is JSX in `.jsx` files (Vite needs the extension); the rollup config resolves `.js`/`.jsx`.
- `file-saver`, `xlsx`, `react`, `react-dom` are **peerDependencies**, externalized in rollup and also installed as devDependencies. Dev `xlsx` comes from the SheetJS CDN tarball (0.20.x) because npm's 0.18.5 has unpatched advisories.
- `exportToExcel(data, fileName, multipleSheets)`: flat array of rows → one sheet named `data`; with `multipleSheets`, an array of `{ sheetName, details }` (names sanitised/deduped by `safeSheetName`).
- Button styles are inline (no CSS file); `JsonToExcel` is `memo`'d.
