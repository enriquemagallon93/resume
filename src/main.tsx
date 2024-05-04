import React from 'react'
import { ViteReactSSG } from 'vite-react-ssg/single-page'
import Resume from './Resume.tsx'

import './reset.css'
import './index.css'

export const createRoot = ViteReactSSG(
  <React.StrictMode>
    <Resume />
  </React.StrictMode>,
)
