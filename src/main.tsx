import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preserve bookmarks from the previous GitHub Pages hash routing.
if (import.meta.env.VITE_GITHUB_PAGES === 'true' && /^#\/(ro|en|it|es)(?:\/|$)/.test(window.location.hash)) {
  const route = window.location.hash.slice(1);
  window.history.replaceState(null, '', import.meta.env.BASE_URL.replace(/\/$/, '') + route);
}

createRoot(document.getElementById("root")!).render(<App />);
