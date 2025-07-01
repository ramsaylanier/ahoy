import App from './App';
import { createRoot } from 'react-dom/client';

class ReactMFE extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    const root = createRoot(mountPoint);
    root.render(<App />);
  }
}
customElements.define('react-frontend', ReactMFE);
