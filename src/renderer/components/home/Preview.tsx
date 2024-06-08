import { useEffect, useState } from 'react'
import styles from './Preview.module.scss'
import { parseMd } from '../../parser/parser'
import { useAppStore } from '../../store'
import mermaid from 'mermaid'
import { CircularProgress } from '@mui/joy'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.min.css'

export default function Preview() {
  const [processing, setProcessing] = useState(true)
  const editorData = useAppStore((state) => state.editorData)
  const [previewData, setPreviewData] = useState('')

  useEffect(() => {
    const update = async () => {
      let d = await parseMd(editorData as string)
      setPreviewData(d)
      hljs.highlightAll()
      await mermaid.run()
    }

    update().then(() => setProcessing(false))
  }, [editorData, processing])

  if (processing) {
    return <CircularProgress />
  }

  return (
    <div
      className={styles.preview}
      dangerouslySetInnerHTML={{
        __html: previewData
      }}
    ></div>
  )
}
