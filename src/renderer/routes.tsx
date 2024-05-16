import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Settings from './pages/Settings'
import Extensions from './pages/Extensions'
import Main from './pages/Main'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/extensions',
        element: <Extensions />
      }
    ]
  }
])
