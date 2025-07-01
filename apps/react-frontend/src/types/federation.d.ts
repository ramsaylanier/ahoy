declare global {
  interface Window {
    __FEDERATION__?: {
      init: (manifest: Record<string, string>) => Promise<void>;
    };
  }
}

export {};
