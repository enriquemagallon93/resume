import { lazy, Suspense } from 'react';

import ResumeProvider from './resume/ResumeProvider';

const Header = lazy(() => import('./Header'));
const Info = lazy(() => import('./Info'));
const Body = lazy(() => import('./Body'));
const Pages = lazy(() => import('./Pages/Pages'));
const Settings = lazy(() => import('./Settings/Settings'));
const Impact = lazy(() => import('./Impact'));
const DownloadPDF = lazy(() => import('./DownloadPDF'));

const Resume = () => {
  return (
    <ResumeProvider>
      <Suspense >
        <DownloadPDF />
        <Settings>
          <Pages>
            <Header />
            <Impact />
            <Info />
            <Body />
          </Pages>
        </Settings>
      </Suspense>
    </ResumeProvider>
  );
};

export default Resume;
