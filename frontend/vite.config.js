import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Конфигурация сборщика Vite
export default defineConfig({
  plugins: [react()],
})