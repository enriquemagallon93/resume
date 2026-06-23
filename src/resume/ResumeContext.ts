import { createContext } from 'react';

import bundledDefaultJson, { DEFAULT_RESUME_PDF } from './defaultResume.generated';

export const bundledDefault = bundledDefaultJson;

export type ResumeData = typeof bundledDefaultJson;

export const ResumeContext = createContext<ResumeData>(bundledDefault);

// Filename of the PDF matching the currently rendered version, so the download
// button always serves the same version the visitor is viewing.
export const ResumePdfContext = createContext<string>(DEFAULT_RESUME_PDF);
