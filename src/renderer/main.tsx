import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssVarsProvider } from '@mui/joy/styles'
import './styles/base.scss'
import theme from './theme.joy'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider
      modeStorageKey="dMind-theme"
      disableNestedContext
      theme={theme}
      defaultMode="dark"
    >
      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>
)
