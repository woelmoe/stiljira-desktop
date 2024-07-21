import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main'
    },
    plugins: [
      externalizeDepsPlugin(),
      viteStaticCopy({
        targets: [
          {
            src: 'src/renderer/dist',
            dest: '../renderer'
          },
          {
            src: 'src/main/db.json',
            dest: ''
          }
        ]
      })
    ]
  }
})
