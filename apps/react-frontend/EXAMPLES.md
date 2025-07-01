# Module Federation Examples

This document shows how to consume the exposed React components from other applications.

## Exposed Components

The React frontend exposes the following components:

- `./App` - The main React application
- `./ReactApp` - Alias for the main React application
- `./ReactWidget` - A reusable React widget component

## Angular Example

To consume the React components in an Angular application:

### 1. Update Angular Federation Config

Add the React frontend as a remote in your Angular app's `federation.config.js`:

```javascript
const {
  withNativeFederation,
  shareAll,
} = require("@angular-architects/native-federation/config");

module.exports = withNativeFederation({
  name: "your-angular-app",

  remotes: {
    "react-frontend": "http://localhost:3005/remoteEntry.js",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
```

### 2. Update Federation Manifest

Add the React frontend to your `federation.manifest.json`:

```json
{
  "react-frontend": "http://localhost:3005/remoteEntry.js"
}
```

### 3. Load React Components

In your Angular component:

```typescript
import { Component, OnInit } from "@angular/core";
import { loadRemoteModule } from "@angular-architects/native-federation";

@Component({
  selector: "app-example",
  template: `
    <div>
      <h2>Angular Component</h2>
      <div #reactWidgetContainer></div>
    </div>
  `,
})
export class ExampleComponent implements OnInit {
  async ngOnInit() {
    try {
      // Load the React widget
      const ReactWidget = await loadRemoteModule(
        "react-frontend",
        "./ReactWidget"
      );

      // Create React element and render it
      const React = await import("react");
      const ReactDOM = await import("react-dom/client");

      const container = document.querySelector("#reactWidgetContainer");
      if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(
          React.createElement(ReactWidget.default, {
            title: "React Widget in Angular",
            initialCount: 10,
          })
        );
      }
    } catch (error) {
      console.error("Failed to load React widget:", error);
    }
  }
}
```

## React Example

To consume the React components in another React application:

### 1. Update Vite Config

Add the React frontend as a remote in your other React app's `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "other-react-app",
      remotes: {
        "react-frontend": "http://localhost:3005/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.1.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.1.0" },
      },
    }),
  ],
});
```

### 2. Load React Components

In your React component:

```typescript
import React, { useEffect, useState } from "react";

const OtherReactApp: React.FC = () => {
  const [ReactWidget, setReactWidget] = useState<any>(null);

  useEffect(() => {
    const loadWidget = async () => {
      try {
        const module = await import("react-frontend/ReactWidget");
        setReactWidget(() => module.default);
      } catch (error) {
        console.error("Failed to load React widget:", error);
      }
    };

    loadWidget();
  }, []);

  return (
    <div>
      <h2>Other React App</h2>
      {ReactWidget && <ReactWidget title="Widget from Another React App" />}
    </div>
  );
};

export default OtherReactApp;
```

## Vue Example

To consume the React components in a Vue application:

### 1. Update Vite Config

Add the React frontend as a remote in your Vue app's `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "vue-app",
      remotes: {
        "react-frontend": "http://localhost:3005/remoteEntry.js",
      },
    }),
  ],
});
```

### 2. Load React Components

In your Vue component:

```vue
<template>
  <div>
    <h2>Vue Component</h2>
    <div ref="reactContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const reactContainer = ref<HTMLElement>();

onMounted(async () => {
  try {
    const ReactWidget = await import("react-frontend/ReactWidget");
    const React = await import("react");
    const ReactDOM = await import("react-dom/client");

    if (reactContainer.value) {
      const root = ReactDOM.createRoot(reactContainer.value);
      root.render(
        React.createElement(ReactWidget.default, {
          title: "React Widget in Vue",
          initialCount: 15,
        })
      );
    }
  } catch (error) {
    console.error("Failed to load React widget:", error);
  }
});
</script>
```

## Notes

- Make sure the React frontend is running on port 3005 before trying to consume its components
- The React components are shared as singletons, so React and React-DOM versions should be compatible
- Error handling is important as remote modules may not always be available
- Consider using TypeScript interfaces for better type safety when consuming remote components
