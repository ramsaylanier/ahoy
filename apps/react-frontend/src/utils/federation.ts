// Utility function to load remote modules
export const loadRemoteModule = async (
  remoteName: string,
  modulePath: string
) => {
  try {
    // Dynamic import of the remote module
    const module = await import(
      /* webpackIgnore: true */ `${remoteName}${modulePath}`
    );
    return module;
  } catch (error) {
    console.error(
      `Failed to load remote module ${remoteName}${modulePath}:`,
      error
    );
    throw error;
  }
};

// Utility function to check if a remote is available
export const isRemoteAvailable = async (
  remoteName: string
): Promise<boolean> => {
  try {
    const response = await fetch(`/federation.manifest.json`);
    const manifest = await response.json();
    return !!manifest[remoteName];
  } catch (error) {
    console.warn(
      `Failed to check remote availability for ${remoteName}:`,
      error
    );
    return false;
  }
};
