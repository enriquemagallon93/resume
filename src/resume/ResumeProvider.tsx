import { ReactNode, useEffect, useState } from 'react';

import { bundledDefault, ResumeContext, ResumeData } from './ResumeContext';
import { resolveVersion, ResolveParams, Resolution, ResumeManifest } from './resolveVersion';
import { BUNDLED_DEFAULT_PATH, MANIFEST_URL, REPO_RAW_BASE } from './source';

const logResolution = (params: ResolveParams, resolution: Resolution, usesBundled: boolean) => {
  const { version, reason, reasonCode } = resolution;
  console.groupCollapsed('%c[resume] version resolution', 'color:#c96442;font-weight:bold');
  console.log('query params:', params);
  console.log('manifest:', MANIFEST_URL);
  console.log('resolved:', version ? `${version.name} → ${version.path}` : '(none)');
  console.log('reason:', `[${reasonCode}] ${reason}`);
  console.log('action:', usesBundled ? 'using bundled default (no fetch)' : `fetching ${REPO_RAW_BASE}${version?.path}`);
  console.groupEnd();
};

const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(bundledDefault);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const params: ResolveParams = { p: query.get('p'), g: query.get('g'), v: query.get('v') };
    const debug = query.get('debug') === 'true';
    const hasSelector = Boolean(params.p || params.g || params.v);

    if (!hasSelector && !debug) return;

    let cancelled = false;

    (async () => {
      try {
        const manifestResponse = await fetch(MANIFEST_URL);
        if (!manifestResponse.ok) throw new Error(`manifest fetch failed (${manifestResponse.status})`);
        const manifest = (await manifestResponse.json()) as ResumeManifest;

        const resolution = resolveVersion(manifest, params);
        const { version } = resolution;
        const usesBundled = !version || version.path === BUNDLED_DEFAULT_PATH;

        if (debug) logResolution(params, resolution, usesBundled);
        if (usesBundled) return;

        const versionResponse = await fetch(`${REPO_RAW_BASE}${version.path}`);
        if (!versionResponse.ok) throw new Error(`version fetch failed (${versionResponse.status})`);
        const fetchedResume = (await versionResponse.json()) as ResumeData;

        if (!cancelled) setResume(fetchedResume);
      } catch (error) {
        if (debug) console.warn('[resume] resolution/fetch failed, using bundled default:', error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <ResumeContext.Provider value={resume}>{children}</ResumeContext.Provider>;
};

export default ResumeProvider;
