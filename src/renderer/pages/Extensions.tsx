import { Divider } from '@mui/joy'
import ExtenstionCard from '../components/extensions/ExtenstionCard'
import styles from './Extensions.module.scss'
import { IExtensionCard } from 'src/types'
import {
  CalculateOutlined,
  CodeOffOutlined,
  CodeOutlined,
  ShowChartOutlined
} from '@mui/icons-material'

const extensions: IExtensionCard[] = [
  {
    title: 'Mermaid',
    desc: 'JavaScript based diagramming and charting tool.',
    url: 'https://mermaid.js.org/',
    extOn: true,
    topic: 'Diagram',
    topicIcon: <ShowChartOutlined />
  },
  {
    title: 'KaTeX',
    desc: 'JavaScript library for TeX math rendering.',
    extOn: true,
    url: 'https://katex.org/',
    topic: 'Math',
    topicIcon: <CalculateOutlined />
  },
  {
    title: 'highlight.js',
    desc: 'JavaScript library syntax highlighting.',
    extOn: true,
    url: 'https://highlightjs.com/',
    topic: 'Code',
    topicIcon: <CodeOutlined />
  }
]

export default function Extensions() {
  return (
    <div className={styles.extensionsPage}>
      <h1>Extensions</h1>
      <Divider />

      <div className={styles.list}>
        {extensions.map((ext) => (
          <ExtenstionCard {...ext} />
        ))}
      </div>
    </div>
  )
}