export type ResumeVersion = {
  name: string;
  path: string;
  aliases: string[];
  groupId: string;
  releaseDate: string;
};

export type ResumeManifest = {
  defaultFile: string;
  versions: ResumeVersion[];
};

export type ResolveParams = {
  p?: string | null;
  g?: string | null;
  v?: string | null;
};

export type Resolution = {
  version?: ResumeVersion;
  reasonCode: string;
  reason: string;
};

// releaseDate is an ISO date (YYYY-MM-DD) so lexical compare === chronological.
const newest = (list: ResumeVersion[]): ResumeVersion | undefined =>
  list.slice().sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1))[0];

// Precedence: p (path) → g (group) → v (version alias) → default.
//  - p: exact path match wins; otherwise fall through.
//  - g: if the group exists, v selects within it (else newest of group);
//       if the group is unknown, fall through.
//  - v: first version whose aliases include v.
//  - otherwise: the manifest defaultFile.
export const resolveVersion = (
  manifest: ResumeManifest,
  { p, g, v }: ResolveParams,
): Resolution => {
  const versions = manifest.versions ?? [];
  const byPath = (path?: string) => versions.find((ver) => ver.path === path);

  if (p) {
    const hit = byPath(p);
    if (hit) return { version: hit, reasonCode: 'path', reason: `?p=${p} matched an existing path` };
  }

  if (g) {
    const groupVersions = versions.filter((ver) => ver.groupId === g);
    if (groupVersions.length) {
      if (v) {
        const inGroup = groupVersions.find((ver) => ver.aliases?.includes(v));
        if (inGroup) {
          return { version: inGroup, reasonCode: 'group+version', reason: `?g=${g} + ?v=${v} matched an alias inside the group` };
        }
        return { version: newest(groupVersions), reasonCode: 'group-latest', reason: `?g=${g} found but ?v=${v} not in group → newest in group` };
      }
      return { version: newest(groupVersions), reasonCode: 'group-latest', reason: `?g=${g} found, no ?v → newest in group` };
    }
  }

  if (v) {
    const hit = versions.find((ver) => ver.aliases?.includes(v));
    if (hit) return { version: hit, reasonCode: 'version', reason: `?v=${v} matched an alias` };
  }

  return { version: byPath(manifest.defaultFile), reasonCode: 'default', reason: 'no selector matched → manifest defaultFile' };
};
