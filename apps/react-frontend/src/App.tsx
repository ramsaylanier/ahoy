import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { isRemoteAvailable } from "./utils/federation";
import ReactWidget from "./components/ReactWidget";

function App() {
  const [count, setCount] = useState(0);
  const [remoteAvailable, setRemoteAvailable] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Check which remotes are available
    const checkRemotes = async () => {
      const projectsAvailable = await isRemoteAvailable("projects");
      const widgetAvailable = await isRemoteAvailable("widget");
      setRemoteAvailable({
        projects: projectsAvailable,
        widget: widgetAvailable,
      });
    };

    checkRemotes();
  }, []);

  const handleLoadRemote = async (remoteName: string) => {
    try {
      console.log(`Attempting to load remote: ${remoteName}`);
      // This is a placeholder - you would implement actual remote loading here
      // const remoteModule = await loadRemoteModule(remoteName, '/Component');
      // console.log('Loaded remote module:', remoteModule);
    } catch (error) {
      console.error(`Failed to load remote ${remoteName}:`, error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Module Federation</h1>

      {/* Module Federation Status */}
      <div
        className="federation-status"
        style={{
          margin: "20px 0",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <h3>Module Federation Status:</h3>
        <p>
          Projects Remote:{" "}
          {remoteAvailable.projects ? "✅ Available" : "❌ Not Available"}
        </p>
        <p>
          Widget Remote:{" "}
          {remoteAvailable.widget ? "✅ Available" : "❌ Not Available"}
        </p>

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => handleLoadRemote("projects")}
            disabled={!remoteAvailable.projects}
            style={{ marginRight: "10px" }}
          >
            Load Projects Module
          </button>
          <button
            onClick={() => handleLoadRemote("widget")}
            disabled={!remoteAvailable.widget}
          >
            Load Widget Module
          </button>
        </div>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Example of exposed React component */}
      <div style={{ marginTop: "30px" }}>
        <h2>Exposed React Component Example:</h2>
        <ReactWidget title="Example Widget" initialCount={5} />
      </div>
    </>
  );
}

export default App;
