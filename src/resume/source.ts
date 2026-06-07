// Resume data is fetched at runtime from the repo's `main` branch so new
// versions can be added by committing JSON + editing the manifest, with no
// app redeploy. A redeploy is only needed when a version requires new code
// (e.g. an unsupported node type or icon).
export const REPO_RAW_BASE =
  'https://raw.githubusercontent.com/enriquemagallon93/resume/main/resumes/';

export const MANIFEST_URL = `${REPO_RAW_BASE}manifest.json`;

// The single version bundled at build time: it renders instantly via SSG and
// doubles as the offline / fetch-failure fallback. Keep this in sync with the
// file imported in ResumeContext.ts and (ideally) the manifest's defaultFile.
export const BUNDLED_DEFAULT_PATH = 'product-engineer-2025-December-17.json';
