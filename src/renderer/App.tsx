import styles from './styles/app.module.scss'
import SideBar from './components/home/SideBar'

import 'katex/dist/katex.min.css'

import Main from './pages/Main'
import { Outlet } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <SideBar />

      <Outlet />
    </div>
  )
}

export default App
