import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path for GitHub Pages.
//
// This repo deploys to https://sammytsang.github.io (a GitHub *user* page:
// repo name === sammytsang.github.io), which is served from the root, so
// base stays '/'. If you ever deploy this as a *project* page instead
// (e.g. github.com/sammytsang/portfolio -> sammytsang.github.io/portfolio/),
// set VITE_BASE_PATH=/portfolio/ when building, or change the fallback below.
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    // No manual chunking: the 3D hero and each demo are already behind their
    // own dynamic import() (see RobotArmScene.tsx / demos/registry.ts), so
    // Vite/Rollup already splits three.js, recharts, etc. into separate,
    // lazily-fetched chunks without needing to hand-list them here.
  },
})
