import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/globals.css'
import App from './app/layout/App.tsx'
import { Provider } from 'react-redux'
import { store } from './lib/stores/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
