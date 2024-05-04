import React from 'react'
import { ViteReactSSG } from 'vite-react-ssg/single-page'
import App from './App.tsx'

import './reset.css'
import './index.css'

export const createRoot = ViteReactSSG(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
