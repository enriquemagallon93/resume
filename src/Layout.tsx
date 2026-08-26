import { lazy } from 'react';

import { useResume } from './resume/useResume';
import { TERMINAL_VARIANT } from './resume/ResumeContext';

const Header = lazy(() => import('./Header'));
const Impact = lazy(() => import('./Impact'));
const Info = lazy(() => import('./Info'));
const Body = lazy(() => import('./Body'));
const TerminalResume = lazy(() => import('./TerminalResume'));

const Layout = () => {
  const resume = useResume();

  if (resume.variant === TERMINAL_VARIANT) {
    return <TerminalResume />;
  }

  return (
    <>
      <Header />
      <Impact />
      <Info />
      <Body />
    </>
  );
};

export default Layout;
