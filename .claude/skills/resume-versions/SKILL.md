---
name: resume-versions
description: Manage resume versions in this repo — list, add, remove, change/update a resume version, or set the default resume. Use when the user says things like "manage resume versions", "list resume versions", "add a resume version", "remove a resume version", "update a resume version", or "set default resume".
---

# Resume version management

CRUD over the versioned resumes in `resumes/`. The source of truth is `resumes/manifest.json`; every operation must keep the manifest and the version JSON files consistent — always update both together.

## How the version system works

- `resumes/manifest.json` schema:
  - `defaultFile`: must equal the `path` of one of the versions.
  - `versions[]`: each entry is `{ name, path, aliases: string[], groupId, releaseDate, pdf }`.
- `resumes/*.json` are the resume version files; `path` is the filename relative to `resumes/`.
- `pdf` is the filename (in `public/`) of that version's downloadable PDF. The download button (`src/DownloadPDF.tsx`) resolves the same version as the page via query params + manifest and serves its `pdf`, so the download always matches what's on screen. The bundled/SSG default's PDF is baked in by `scripts/generate-default-resume.mjs` (as `DEFAULT_RESUME_PDF`).
- `scripts/generate-default-resume.mjs` runs at dev/build and bakes `defaultFile` into the bundled/SSG default (what no-JS visitors and offline fallback see).
- Runtime resolution (`src/resume/resolveVersion.ts`): `?p=<path>` → `?g=<groupId>` (newest in group by `releaseDate`, optionally narrowed by `?v=<alias>`) → `?v=<alias>` → `defaultFile`.
- Version files are fetched at runtime from the `main` branch via raw GitHub (`src/resume/source.ts`), so changes are only live once committed and pushed to `main`. Note this to the user; do not push automatically.

## Invariants (enforce on every change)

- File naming: `<groupId>-<yyyy>-<MonthName>-<dd>.json` — full English month name, zero-padded day (e.g. `product-engineer-2026-June-07.json`). The name must match the version's `groupId` and `releaseDate`.
- `aliases` must be unique across **all** versions so `?v=` is deterministic.
- `releaseDate` is ISO `YYYY-MM-DD`.
- `defaultFile` must always point at an existing version's `path`.
- Every version has a `pdf` whose file exists in `public/`. PDF naming: `enrique_resume_<monthname-lowercase>_<yyyy>.pdf` (the manifest `pdf` field is the source of truth, so the app does not depend on the exact spelling).
- Manifest formatting: 4-space indentation and a trailing newline.

After every change, validate: each version JSON parses, every `path` exists on disk, every `pdf` exists in `public/`, and all invariants above hold. Report any violation instead of leaving the repo inconsistent.

## Operations

### List
Print a table of all versions: name, path, aliases, groupId, releaseDate. Mark which one is the current default (`defaultFile`).

### Add
1. Gather name, groupId, aliases, and releaseDate from the user (ask for anything missing).
2. Create the version JSON: by default copy an existing version as a template (prefer one from the same group), or use a file the user points to.
3. Name the file per the convention and add the matching manifest entry (including its `pdf` filename).
4. Generate the version's PDF (see [Generate the version PDF](#generate-the-version-pdf)).

### Remove
Delete the version's JSON file and its manifest entry. If it is the current `defaultFile`, refuse unless the user explicitly confirms — and then require them to pick a new default first.

### Change / update
Edit a version's metadata (name/aliases/groupId/releaseDate) and/or its JSON content. If `groupId` or `releaseDate` changes, rename the file to match the naming convention and update `path` (and `defaultFile` if it pointed at the old path). **If the JSON content changed, regenerate the version's PDF** (see [Generate the version PDF](#generate-the-version-pdf)) so the download stays in sync.

### Set default
Set `manifest.defaultFile` to an existing version's `path`.

## Generate the version PDF

The download button serves a static PDF per version from `public/`. After adding a version or changing a version's content, (re)generate its PDF by printing the rendered page so the download matches what's on screen:

1. Start the app: `bun run dev` (serves at `http://localhost:5173/`).
2. Render the target version locally. Local dev fetches non-default versions from the remote `main` branch, so to capture **local** edits, temporarily point `manifest.defaultFile` at the target version's `path`, restart `bun run dev` (this bakes it as the bundled default), and open `/`. Restore `defaultFile` afterward.
3. Wait for the resume to finish rendering (e.g. wait for the "Housecall Pro" text), then print to PDF with Playwright — this emulates print media so the site's print styles apply and the settings panel is hidden:
   ```js
   await page.emulateMedia({ media: 'print' });
   await page.pdf({ path: 'public/<pdf-filename>', printBackground: true, preferCSSPageSize: true });
   ```
4. Save it as `public/<pdf-filename>` (per the naming convention) and set the version's manifest `pdf` field to that filename.
5. Commit the new/updated PDF together with the manifest.

## Redeploy after content, PDF, or default changes

Ask the user whether to run `bun run docs` (full rebuild + redeploy to GitHub Pages). Explain why a redeploy is needed:

- **JSON content** of a non-default version is fetched live from `main` via raw GitHub, so `?p=`/`?v=`/`?g=` selection updates immediately on push — no redeploy.
- **The bundled/no-JS (SSG) default** is baked in at build time, so changing `defaultFile` (or editing the default version's JSON) only takes effect after a rebuild.
- **PDFs** live in `public/` and are baked into the deployed site, so a new or updated PDF is only downloadable after a redeploy.
