import { createContext } from 'react';

import bundledDefaultJson, { DEFAULT_RESUME_PDF } from './defaultResume.generated';

export const bundledDefault = bundledDefaultJson;

/** Alternate visual layouts a version can opt into via its JSON "variant" field. */
export const TERMINAL_VARIANT = 'terminal';

export type ResumeVariant = typeof TERMINAL_VARIANT;

export type ResumeData = typeof bundledDefaultJson & {
  variant?: ResumeVariant;
  /** Rendered next to the name (e.g. "he/him/his") so ATS parsers pick it up from the text. */
  pronouns?: string;
};

export const ResumeContext = createContext<ResumeData>(bundledDefault);

// Filename of the PDF matching the currently rendered version, so the download
// button always serves the same version the visitor is viewing.
export const ResumePdfContext = createContext<string>(DEFAULT_RESUME_PDF);
