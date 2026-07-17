/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { createAppConfig } from '@nextcloud/vite-config'
import { join, resolve } from 'path'

const customConfig = {
  resolve: {
    alias: {
      '@': resolve('src/js'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    sourcemap: true,
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.message?.includes('#__PURE__')) return
        if (warning.message?.includes('css-injected-by-js')) return
        warn(warning)
      },
         treeshake: true
      },
  },
}
export default createAppConfig(
  {
    main: resolve(join('src', 'main.ts')),
    userSettings: resolve(join('src', 'userSettings.ts')),
    adminSettings: resolve(join('src', 'adminSettings.ts')),
    dashboard: resolve(join('src', 'dashboard.ts')),
    reference: resolve(join('src', 'agora-reference.ts')),
  },
  {
    inlineCSS: { relativeCSSInjection: true },
    config: customConfig,
  }
)
