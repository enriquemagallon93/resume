import { ReactNode, useEffect, useState } from 'react';

import { bundledDefault, ResumeContext, ResumeData } from './ResumeContext';
import { resolveVersion, ResumeManifest } from './resolveVersion';
import { BUNDLED_DEFAULT_PATH, MANIFEST_URL, REPO_RAW_BASE } from './source';

const ResumeProvider = ({ children }: { children: ReactNode }) => {
  // Start from the bundled default so SSG output and first paint are instant.
  const [data, setData] = useState<ResumeData>(bundledDefault);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    const g = params.get('g');
    const v = params.get('v');
    const debug = params.get('debug') === 'true';
    const hasSelector = Boolean(p || g || v);

    // No selector and not debugging → keep the bundled default, no network.
    if (!hasSelector && !debug) return;

    let cancelled = false;

    (async () => {
      try {
        const manifestRes = await fetch(MANIFEST_URL);
        if (!manifestRes.ok) throw new Error(`manifest fetch failed (${manifestRes.status})`);
        const manifest = (await manifestRes.json()) as ResumeManifest;

        const { version, reason, reasonCode } = resolveVersion(manifest, { p, g, v });
        const usesBundled = !version || version.path === BUNDLED_DEFAULT_PATH;

        if (debug) {
          console.groupCollapsed('%c[resume] version resolution', 'color:#c96442;font-weight:bold');
          console.log('query params:', { p, g, v });
          console.log('manifest:', MANIFEST_URL);
          console.log('resolved:', version ? `${version.name} → ${version.path}` : '(none)');
          console.log('reason:', `[${reasonCode}] ${reason}`);
          console.log('action:', usesBundled ? 'using bundled default (no fetch)' : `fetching ${REPO_RAW_BASE}${version.path}`);
          console.groupEnd();
        }

        if (usesBundled) return;

        const versionRes = await fetch(`${REPO_RAW_BASE}${version.path}`);
        if (!versionRes.ok) throw new Error(`version fetch failed (${versionRes.status})`);
        const json = (await versionRes.json()) as ResumeData;

        if (!cancelled) setData(json);
      } catch (err) {
        if (debug) console.warn('[resume] resolution/fetch failed, using bundled default:', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <ResumeContext.Provider value={data}>{children}</ResumeContext.Provider>;
};

export default ResumeProvider;
