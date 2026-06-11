import { ReactNode, useEffect, useState } from 'react';

import { bundledDefault, ResumeContext, ResumeData } from './ResumeContext';
import { resolveVersion, ResolveParams, Resolution, ResumeManifest } from './resolveVersion';
import { BUNDLED_DEFAULT_PATH, MANIFEST_URL, PARAM_DEBUG, PARAM_GROUP, PARAM_PATH, PARAM_VERSION, REPO_RAW_BASE } from './source';

const LOG_PREFIX = '[resume]';
const LOG_STYLE = 'color:#c96442;font-weight:bold';

async function fetchJson<Data>(url: string): Promise<Data> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed (${response.status}): ${url}`);
  return response.json() as Promise<Data>;
}

const logResolution = (params: ResolveParams, resolution: Resolution, usesBundled: boolean) => {
  const { version, reason, reasonCode } = resolution;
  console.groupCollapsed(`%c${LOG_PREFIX} version resolution`, LOG_STYLE);
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
    const params: ResolveParams = { p: query.get(PARAM_PATH), g: query.get(PARAM_GROUP), v: query.get(PARAM_VERSION) };
    const debug = query.get(PARAM_DEBUG) === 'true';
    const hasSelector = Boolean(params.p || params.g || params.v);

    if (!hasSelector && !debug) return;

    let cancelled = false;

    (async () => {
      try {
        const manifest = await fetchJson<ResumeManifest>(MANIFEST_URL);
        const resolution = resolveVersion(manifest, params);
        const { version } = resolution;
        const usesBundled = !version || version.path === BUNDLED_DEFAULT_PATH;

        if (debug) logResolution(params, resolution, usesBundled);
        if (usesBundled) return;

        const fetchedResume = await fetchJson<ResumeData>(`${REPO_RAW_BASE}${version.path}`);
        if (!cancelled) setResume(fetchedResume);
      } catch (error) {
        if (debug) console.warn(`${LOG_PREFIX} resolution/fetch failed, using bundled default:`, error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <ResumeContext.Provider value={resume}>{children}</ResumeContext.Provider>;
};

export default ResumeProvider;
