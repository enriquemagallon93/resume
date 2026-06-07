import { createContext } from 'react';

import bundledDefaultJson from './defaultResume.generated';

export const bundledDefault = bundledDefaultJson;

export type ResumeData = typeof bundledDefaultJson;

export const ResumeContext = createContext<ResumeData>(bundledDefault);
