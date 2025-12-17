import React from 'react';
import ReactDOM from 'react-dom/client';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import Resume from './Resume.tsx';
import { HelmetProvider } from 'react-helmet-async';

import './reset.css';
import './index.css';

const mode = import.meta.env.MODE;

let root = undefined;

if (mode === 'development') {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <HelmetProvider>
        <Resume />
      </HelmetProvider>
    </React.StrictMode>,
  );
} else {
  root = ViteReactSSG(
    <React.StrictMode>
      <HelmetProvider>
        <Resume />
      </HelmetProvider>
    </React.StrictMode>,
  );
}

export const createRoot = root;
