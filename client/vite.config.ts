import { defineConfig } from 'vite';

type PluginFactory = () => import('vite').PluginOption;

export default defineConfig(async () => {
  let reactPlugin: PluginFactory | null = null;

  try {
    const mod = await import('@vitejs/plugin-react');
    const resolved = (mod as { default?: PluginFactory }).default ?? (mod as PluginFactory);

    if (typeof resolved === 'function') {
      reactPlugin = resolved;
    }
  } catch (error) {
    console.warn(
      '[vite] Optional dependency @vitejs/plugin-react not installed; continuing without React Fast Refresh.'
    );
  }

  return {
    plugins: reactPlugin ? [reactPlugin()] : [],
    esbuild: reactPlugin
      ? undefined
      : {
          jsx: 'automatic',
          jsxImportSource: 'react'
        },
    server: {
      port: 5173,
      proxy: {
        '/api': 'http://localhost:4000'
      }
    }
  };
});
