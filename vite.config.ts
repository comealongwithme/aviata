import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueTypeImports from 'vite-plugin-vue-type-imports'

// prod url зависит от github pages репозитория
const baseURL = process.env.NODE_ENV === 'production' ? '/bronevik/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueTypeImports()
  ],
  base: baseURL
})
