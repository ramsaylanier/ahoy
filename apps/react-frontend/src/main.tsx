import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Initialize module federation
const initFederation = async () => {
  try {
    // Load federation manifest
    const response = await fetch("/federation.manifest.json");
    const manifest = await response.json();

    // Initialize federation with manifest
    if (window.__FEDERATION__) {
      await window.__FEDERATION__.init(manifest);
    }
  } catch (error) {
    console.warn("Failed to initialize module federation:", error);
  }
};

// Initialize federation and then render the app
initFederation().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
