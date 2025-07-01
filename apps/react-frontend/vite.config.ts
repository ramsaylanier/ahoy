import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "react-frontend",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
        "./ReactApp": "./src/App.tsx",
        "./ReactWidget": "./src/components/ReactWidget.tsx",
      },
      remotes: {
        // You can add remote modules here when needed
        // 'projects': 'http://localhost:3001/remoteEntry.js',
        // 'widget': 'http://localhost:3003/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.1.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.1.0" },
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3005,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
});
