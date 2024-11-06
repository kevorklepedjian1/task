import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig as vitestDefineConfig } from 'vitest';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',  // Set jsdom for Vitest environment
    globals: true,
  },
});
