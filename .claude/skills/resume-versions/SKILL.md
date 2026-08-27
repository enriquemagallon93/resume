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

The download button serves a static PDF per version from `public/`. After adding a version or changing a version's content, (re)generate its PDF with:

```sh
bun run generate:pdf [aliasOrPath]   # omit the arg to target the current default
```

`scripts/generate-pdf.mjs` does the whole flow: temporarily bakes the target version as the bundled default (local dev fetches non-default versions from remote `main`, so this is how local edits get captured), starts the dev server, prints the rendered page with Playwright under print media emulation (terminal variant: A4 + zero margins; others: `preferCSSPageSize`), writes `public/<pdf>` per the manifest, stamps PDF metadata (Title/Author with pronouns/Subject/Keywords with the version's links) via Ghostscript, and restores the manifest. Requirements: `gs` installed and a Playwright Chromium under `~/.cache/ms-playwright` (or `CHROMIUM_PATH`); port 5173 must be free.

Commit the new/updated PDF together with the manifest. If the version is new, set its manifest `pdf` field (naming convention above) before running the script.

## Redeploy after content, PDF, or default changes

Ask the user whether to run `bun run docs` (full rebuild + redeploy to GitHub Pages). Explain why a redeploy is needed:

- **JSON content** of a non-default version is fetched live from `main` via raw GitHub, so `?p=`/`?v=`/`?g=` selection updates immediately on push — no redeploy.
- **The bundled/no-JS (SSG) default** is baked in at build time, so changing `defaultFile` (or editing the default version's JSON) only takes effect after a rebuild.
- **PDFs** live in `public/` and are baked into the deployed site, so a new or updated PDF is only downloadable after a redeploy.
