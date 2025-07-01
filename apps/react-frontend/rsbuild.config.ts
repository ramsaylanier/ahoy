import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { dependencies } from './package.json';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'react_frontend',
      exposes: {
        './App': './src/remote-entry.tsx',
      },
      filename: 'remoteEntry.js',
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3005,
    cors: true,
  },
});
