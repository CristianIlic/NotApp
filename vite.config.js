import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        /^@fontsource\/Poppins\/600\.css$/,
        // Agrega otras dependencias externas si es necesario
      ],
    },
  },
});