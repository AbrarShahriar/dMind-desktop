import { Divider } from '@mui/joy'
import ExtenstionCard from '../components/extensions/ExtenstionCard'
import styles from './Extensions.module.scss'
import { IExtensionCard } from 'src/types'

import { useEffect, useState } from 'react'

export default function Extensions() {
  const [extensions, setExtensions] = useState<IExtensionCard[]>([])

  useEffect(() => {
    window.api.getPluginConfig().then((data) => {
      setExtensions(data)
    })
  }, [])
  return (
    <div className={styles.extensionsPage}>
      <h1>Extensions</h1>
      <Divider />

      <div className={styles.list}>
        {extensions.map((ext) => (
          <ExtenstionCard key={ext.title} {...ext} />
        ))}
      </div>
    </div>
  )
}
