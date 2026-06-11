---
name: resume-versions
description: Manage resume versions in this repo — list, add, remove, change/update a resume version, or set the default resume. Use when the user says things like "manage resume versions", "list resume versions", "add a resume version", "remove a resume version", "update a resume version", or "set default resume".
---

# Resume version management

CRUD over the versioned resumes in `resumes/`. The source of truth is `resumes/manifest.json`; every operation must keep the manifest and the version JSON files consistent — always update both together.

## How the version system works

- `resumes/manifest.json` schema:
  - `defaultFile`: must equal the `path` of one of the versions.
  - `versions[]`: each entry is `{ name, path, aliases: string[], groupId, releaseDate }`.
- `resumes/*.json` are the resume version files; `path` is the filename relative to `resumes/`.
- `scripts/generate-default-resume.mjs` runs at dev/build and bakes `defaultFile` into the bundled/SSG default (what no-JS visitors and offline fallback see).
- Runtime resolution (`src/resume/resolveVersion.ts`): `?p=<path>` → `?g=<groupId>` (newest in group by `releaseDate`, optionally narrowed by `?v=<alias>`) → `?v=<alias>` → `defaultFile`.
- Version files are fetched at runtime from the `main` branch via raw GitHub (`src/resume/source.ts`), so changes are only live once committed and pushed to `main`. Note this to the user; do not push automatically.

## Invariants (enforce on every change)

- File naming: `<groupId>-<yyyy>-<MonthName>-<dd>.json` — full English month name, zero-padded day (e.g. `product-engineer-2026-June-07.json`). The name must match the version's `groupId` and `releaseDate`.
- `aliases` must be unique across **all** versions so `?v=` is deterministic.
- `releaseDate` is ISO `YYYY-MM-DD`.
- `defaultFile` must always point at an existing version's `path`.
- Manifest formatting: 4-space indentation and a trailing newline.

After every change, validate: each version JSON parses, every `path` exists on disk, and all invariants above hold. Report any violation instead of leaving the repo inconsistent.

## Operations

### List
Print a table of all versions: name, path, aliases, groupId, releaseDate. Mark which one is the current default (`defaultFile`).

### Add
1. Gather name, groupId, aliases, and releaseDate from the user (ask for anything missing).
2. Create the version JSON: by default copy an existing version as a template (prefer one from the same group), or use a file the user points to.
3. Name the file per the convention and add the matching manifest entry.

### Remove
Delete the version's JSON file and its manifest entry. If it is the current `defaultFile`, refuse unless the user explicitly confirms — and then require them to pick a new default first.

### Change / update
Edit a version's metadata (name/aliases/groupId/releaseDate) and/or its JSON content. If `groupId` or `releaseDate` changes, rename the file to match the naming convention and update `path` (and `defaultFile` if it pointed at the old path).

### Set default
Set `manifest.defaultFile` to an existing version's `path`.

## After changing the default

Ask the user whether to run `bun run docs` (full rebuild + redeploy to GitHub Pages). Explain why: the bundled/no-JS (SSG) default is baked in at build time, so it only updates after a rebuild — runtime `?v=`/`?g=` selection works immediately without one.
