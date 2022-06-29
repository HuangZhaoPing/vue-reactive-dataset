import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('./utils')

export default defineConfig({
  server: {
    port: 9999
  },
  root: resolve('example'),
  plugins: [vue()]
})
