// Prints a resume version to its `public/` PDF and stamps PDF metadata
// (Title/Author/Subject/Keywords, including pronouns) with Ghostscript, so
// ATS parsers and PDF viewers see the same identity data as the page.
//
// Usage: node scripts/generate-pdf.mjs [aliasOrPath]
//   aliasOrPath: a version alias (e.g. "terminal") or its manifest `path`.
//                Omit to target the current default version.
//
// Local dev fetches non-default versions from the remote `main` branch, so to
// capture local edits this script temporarily points `manifest.defaultFile` at
// the target version, bakes it as the bundled default, prints it, and restores
// the manifest afterward.
import { spawn, spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const LABEL = '[generate:pdf]';
const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}/`;
const RENDERED_TEXT_PROBE = 'Housecall Pro';
const PAGINATION_SETTLE_MS = 800;
const TERMINAL_VARIANT = 'terminal';
const MANIFEST_INDENT = 4;

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = resolve(root, 'resumes/manifest.json');
const publicDir = resolve(root, 'public');

const readManifest = () => JSON.parse(readFileSync(manifestPath, 'utf8'));

const writeManifest = (manifest) =>
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, MANIFEST_INDENT)}\n`);

const regenerateBundledDefault = () => {
  const result = spawnSync('node', [resolve(root, 'scripts/generate-default-resume.mjs')], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`${LABEL} generate-default-resume failed`);
};

const resolveTargetVersion = (manifest, aliasOrPath) => {
  if (!aliasOrPath) return manifest.versions.find((version) => version.path === manifest.defaultFile);
  return manifest.versions.find(
    (version) => version.path === aliasOrPath || version.aliases.includes(aliasOrPath),
  );
};

const findChromiumExecutable = () => {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const playwrightCache = join(homedir(), '.cache/ms-playwright');
  if (!existsSync(playwrightCache)) return null;
  const chromiumDirs = readdirSync(playwrightCache)
    .filter((entry) => /^chromium-\d+$/.test(entry))
    .sort()
    .reverse();
  for (const chromiumDir of chromiumDirs) {
    const executable = join(playwrightCache, chromiumDir, 'chrome-linux64/chrome');
    if (existsSync(executable)) return executable;
    const legacyExecutable = join(playwrightCache, chromiumDir, 'chrome-linux/chrome');
    if (existsSync(legacyExecutable)) return legacyExecutable;
  }
  return null;
};

const isDevServerUp = async () => {
  try {
    const response = await fetch(DEV_SERVER_URL);
    return response.ok;
  } catch {
    return false;
  }
};

const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

const startDevServer = async () => {
  if (await isDevServerUp()) {
    throw new Error(
      `${LABEL} something is already serving on port ${DEV_SERVER_PORT} — stop it first so the printed page uses the locally baked default`,
    );
  }
  const viteBin = resolve(root, 'node_modules/.bin/vite');
  const server = spawn(viteBin, ['--port', String(DEV_SERVER_PORT), '--strictPort'], {
    cwd: root,
    stdio: 'ignore',
  });
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (await isDevServerUp()) return server;
    await sleep(500);
  }
  server.kill();
  throw new Error(`${LABEL} dev server did not come up on ${DEV_SERVER_URL}`);
};

const pdfOptionsFor = (resumeData, outputPath) => {
  const sharedOptions = { path: outputPath, printBackground: true };
  if (resumeData.variant === TERMINAL_VARIANT) {
    // The terminal layout assumes A4 with no printer margins; Chromium's
    // defaults (Letter + margins) overflow it onto a second page.
    return { ...sharedOptions, format: 'A4', margin: { top: 0, right: 0, bottom: 0, left: 0 } };
  }
  return { ...sharedOptions, preferCSSPageSize: true };
};

const printResumeToPdf = async (resumeData, outputPath) => {
  const executablePath = findChromiumExecutable();
  if (!executablePath) {
    throw new Error(
      `${LABEL} no Chromium found — set CHROMIUM_PATH or install one under ~/.cache/ms-playwright`,
    );
  }
  const browser = await chromium.launch({ executablePath });
  try {
    const page = await browser.newPage();
    await page.goto(DEV_SERVER_URL, { waitUntil: 'networkidle' });
    await page.getByText(RENDERED_TEXT_PROBE).first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(PAGINATION_SETTLE_MS);
    await page.emulateMedia({ media: 'print' });
    await page.pdf(pdfOptionsFor(resumeData, outputPath));
  } finally {
    await browser.close();
  }
};

const escapePdfmarkText = (text) => text.replace(/[\\()]/g, (character) => `\\${character}`);

// pdfmark literal strings are PDFDocEncoding (no UTF-8), so any non-ASCII text
// must be written as a UTF-16BE hex string with a BOM to survive intact.
const toPdfmarkString = (text) => {
  if (/^[\x20-\x7E]*$/.test(text)) return `(${escapePdfmarkText(text)})`;
  const utf16beHex = [...text]
    .flatMap((character) => {
      const codeUnits = [];
      for (let index = 0; index < character.length; index += 1) codeUnits.push(character.charCodeAt(index));
      return codeUnits;
    })
    .map((codeUnit) => codeUnit.toString(16).padStart(4, '0'))
    .join('');
  return `<FEFF${utf16beHex}>`;
};

const buildPdfmark = (resumeData) => {
  const fullName = `${resumeData.name} ${resumeData.lastName}`;
  const author = resumeData.pronouns ? `${fullName} (${resumeData.pronouns})` : fullName;
  const keywords = [resumeData.pronouns, ...(resumeData.qrLinks ?? []).map((link) => link.url)]
    .filter(Boolean)
    .join(', ');
  return [
    '[',
    `/Title ${toPdfmarkString(`${fullName} - ${resumeData.title}`)}`,
    `/Author ${toPdfmarkString(author)}`,
    '/Subject (Resume)',
    `/Keywords ${toPdfmarkString(keywords)}`,
    '/DOCINFO pdfmark',
  ].join('\n');
};

const stampPdfMetadata = (resumeData, pdfPath) => {
  const workDir = mkdtempSync(join(tmpdir(), 'resume-pdf-'));
  try {
    const pdfmarkPath = join(workDir, 'metadata.ps');
    const unstampedPdfPath = join(workDir, 'unstamped.pdf');
    writeFileSync(pdfmarkPath, `${buildPdfmark(resumeData)}\n`);
    copyFileSync(pdfPath, unstampedPdfPath);
    const result = spawnSync(
      'gs',
      ['-q', '-dBATCH', '-dNOPAUSE', '-sDEVICE=pdfwrite', '-o', pdfPath, unstampedPdfPath, pdfmarkPath],
      { stdio: 'inherit' },
    );
    if (result.error?.code === 'ENOENT') {
      throw new Error(`${LABEL} Ghostscript (gs) not found — install it to stamp PDF metadata`);
    }
    if (result.status !== 0) throw new Error(`${LABEL} Ghostscript failed to stamp metadata`);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
};

const main = async () => {
  const aliasOrPath = process.argv[2];
  const manifest = readManifest();
  const targetVersion = resolveTargetVersion(manifest, aliasOrPath);
  if (!targetVersion) {
    const knownAliases = manifest.versions.flatMap((version) => version.aliases).join(', ');
    throw new Error(`${LABEL} unknown version "${aliasOrPath}" — known aliases: ${knownAliases}`);
  }

  const originalDefaultFile = manifest.defaultFile;
  const needsDefaultSwap = targetVersion.path !== originalDefaultFile;
  const resumeData = JSON.parse(readFileSync(resolve(root, 'resumes', targetVersion.path), 'utf8'));
  const outputPath = resolve(publicDir, targetVersion.pdf);

  if (needsDefaultSwap) writeManifest({ ...manifest, defaultFile: targetVersion.path });
  regenerateBundledDefault();

  let devServer;
  try {
    devServer = await startDevServer();
    console.log(`${LABEL} printing ${targetVersion.path} → public/${targetVersion.pdf}`);
    await printResumeToPdf(resumeData, outputPath);
    stampPdfMetadata(resumeData, outputPath);
    console.log(`${LABEL} done — metadata stamped (Title/Author/Subject/Keywords)`);
  } finally {
    devServer?.kill();
    if (needsDefaultSwap) {
      writeManifest(manifest);
      regenerateBundledDefault();
    }
  }
};

await main();
