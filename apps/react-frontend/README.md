# React + TypeScript + Vite + Module Federation

This template provides a minimal setup to get React working in Vite with HMR, ESLint rules, and Module Federation support.

## Module Federation Setup

This React app is configured with Module Federation to work as part of a micro-frontend architecture. It can:

- **Expose** its own components for other apps to consume
- **Consume** components from other federated applications
- **Share** common dependencies like React and React-DOM

### Configuration

The Module Federation is configured in `vite.config.ts`:

```typescript
federation({
  name: "react-frontend",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App.tsx",
    "./ReactApp": "./src/App.tsx",
  },
  remotes: {
    // Remote modules can be added here
  },
  shared: {
    react: { singleton: true, requiredVersion: "^19.1.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.1.0" },
  },
});
```

### Available Remotes

The app is configured to work with these remote applications:

- `projects` - Angular projects frontend (port 3001)
- `widget` - Angular widget application (port 3003)

### Usage

1. **Development**: Run `npm run dev` to start the development server
2. **Build**: Run `npm run build` to create a production build with Module Federation
3. **Preview**: Run `npm run preview` to preview the production build

### Loading Remote Modules

Use the utility functions in `src/utils/federation.ts` to load remote modules:

```typescript
import { loadRemoteModule, isRemoteAvailable } from "./utils/federation";

// Check if a remote is available
const available = await isRemoteAvailable("projects");

// Load a remote module
const remoteModule = await loadRemoteModule("projects", "/Component");
```

## Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
