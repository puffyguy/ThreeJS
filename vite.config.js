import { defineConfig } from 'vite'
// import viteRequireContext from '@originjs/vite-plugin-require-context'
// import vitePluginCompression from 'vite-plugin-compression'
// import vitePluginEslint from 'vite-plugin-eslint'

// import { createVuePlugin } from 'vite-plugin-vue2'
// import { VitePWA } from 'vite-plugin-pwa'
// import path from 'path'

export default defineConfig({

  build: {
    chunkSizeWarningLimit: 1600,
  }
})