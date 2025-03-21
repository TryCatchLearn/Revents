import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/globals.css'
import { Provider } from 'react-redux'
import { store } from './lib/stores/store.ts'
import { RouterProvider } from 'react-router'
import { router } from './app/router/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
