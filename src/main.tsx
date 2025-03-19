import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/globals.css'
import App from './app/layout/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
