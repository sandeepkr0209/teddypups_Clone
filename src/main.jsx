import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fonts (no third-party font requests)
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/figtree/index.css'
import '@fontsource-variable/shantell-sans/index.css'
import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
