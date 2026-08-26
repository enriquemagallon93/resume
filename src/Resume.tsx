import { lazy, Suspense } from 'react';

import ResumeProvider from './resume/ResumeProvider';

const Layout = lazy(() => import('./Layout'));
const Pages = lazy(() => import('./Pages/Pages'));
const Settings = lazy(() => import('./Settings/Settings'));
const DownloadPDF = lazy(() => import('./DownloadPDF'));

const Resume = () => {
  return (
    <ResumeProvider>
      <Suspense >
        <DownloadPDF />
        <Settings>
          <Pages>
            <Layout />
          </Pages>
        </Settings>
      </Suspense>
    </ResumeProvider>
  );
};

export default Resume;
