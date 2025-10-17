declare module '@vitejs/plugin-react' {
  import type { PluginOption } from 'vite';

  const plugin: () => PluginOption;
  export default plugin;
}
