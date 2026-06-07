import { createContext } from 'react';

import bundledDefaultJson from '../../resumes/product-engineer-2025-December-17.json';

export const bundledDefault = bundledDefaultJson;

export type ResumeData = typeof bundledDefaultJson;

export const ResumeContext = createContext<ResumeData>(bundledDefault);
