import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CssVarsProvider } from '@mui/joy/styles'
import './styles/base.scss'
import theme from './theme.joy'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider
      modeStorageKey="dMind-theme"
      disableNestedContext
      theme={theme}
      defaultMode="dark"
    >
      <App />
    </CssVarsProvider>
  </React.StrictMode>
)
