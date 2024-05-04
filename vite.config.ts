import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  // @ts-ignore
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH
  }
})
