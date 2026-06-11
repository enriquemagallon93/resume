import { PARAM_GROUP, PARAM_PATH, PARAM_VERSION } from './source';

export const PATH_REASON = 'path';
export const GROUP_AND_VERSION_REASON = 'group+version';
export const GROUP_LATEST_REASON = 'group-latest';
export const VERSION_REASON = 'version';
export const DEFAULT_REASON = 'default';

export type ReasonCode =
  | typeof PATH_REASON
  | typeof GROUP_AND_VERSION_REASON
  | typeof GROUP_LATEST_REASON
  | typeof VERSION_REASON
  | typeof DEFAULT_REASON;

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
  /** Path to the resume JSON file */
  p?: string | null;
  /** Group id of a resume variant */
  g?: string | null;
  /** Version: an alias for a resume variant */
  v?: string | null;
};

export type Resolution = {
  version?: ResumeVersion;
  reasonCode: ReasonCode;
  reason: string;
};

const findByPath = (versions: ResumeVersion[], target?: string) =>
  versions.find((candidate) => candidate.path === target);

const findByAlias = (versions: ResumeVersion[], alias: string) =>
  versions.find((candidate) => candidate.aliases?.includes(alias));

// ISO dates (YYYY-MM-DD) compare lexicographically, so the highest string is the newest.
const getNewest = (versions: ResumeVersion[]): ResumeVersion | undefined =>
  [...versions].sort((left, right) => right.releaseDate.localeCompare(left.releaseDate))[0];

const getByPath = (versions: ResumeVersion[], path?: string | null): Resolution | undefined => {
  const match = path ? findByPath(versions, path) : undefined;
  if (!match) return undefined;
  return { version: match, reasonCode: PATH_REASON, reason: `?${PARAM_PATH}=${path} matched an existing path` };
};

const getByGroup = (versions: ResumeVersion[], group?: string | null, version?: string | null): Resolution | undefined => {
  if (!group) return undefined;
  const groupVersions = versions.filter((candidate) => candidate.groupId === group);
  if (!groupVersions.length) return undefined;

  const aliasMatch = version ? findByAlias(groupVersions, version) : undefined;
  if (aliasMatch) {
    return { version: aliasMatch, reasonCode: GROUP_AND_VERSION_REASON, reason: `?${PARAM_GROUP}=${group} + ?${PARAM_VERSION}=${version} matched an alias inside the group` };
  }
  return { version: getNewest(groupVersions), reasonCode: GROUP_LATEST_REASON, reason: `?${PARAM_GROUP}=${group} → newest in group` };
};

const getByVersion = (versions: ResumeVersion[], version?: string | null): Resolution | undefined => {
  const match = version ? findByAlias(versions, version) : undefined;
  if (!match) return undefined;
  return { version: match, reasonCode: VERSION_REASON, reason: `?${PARAM_VERSION}=${version} matched an alias` };
};

const getDefault = (versions: ResumeVersion[], defaultFile: string): Resolution => ({
  version: findByPath(versions, defaultFile),
  reasonCode: DEFAULT_REASON,
  reason: 'no selector matched → manifest defaultFile',
});

export const resolveVersion = (
  manifest: ResumeManifest,
  { p: path, g: group, v: version }: ResolveParams,
): Resolution => {
  const versions = manifest.versions ?? [];
  return getByPath(versions, path)
    || getByGroup(versions, group, version)
    || getByVersion(versions, version)
    || getDefault(versions, manifest.defaultFile);
};
