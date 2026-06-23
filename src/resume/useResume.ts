import { useContext } from 'react';

import { ResumeContext, ResumePdfContext } from './ResumeContext';

export const useResume = () => useContext(ResumeContext);

export const useResumePdf = () => useContext(ResumePdfContext);
