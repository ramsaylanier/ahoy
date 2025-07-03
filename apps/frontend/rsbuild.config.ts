import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
// import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
// import { dependencies } from './package.json';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  plugins: [
    pluginReact(),
    // pluginModuleFederation({
    //   name: 'frontend',
    //   shared: {
    //     ...dependencies,
    //     react: {
    //       singleton: true,
    //       requiredVersion: dependencies['react'],
    //     },
    //     'react-dom': {
    //       singleton: true,
    //       requiredVersion: dependencies['react-dom'],
    //     },
    //   },
    // }),
  ],
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true,
  },
});
