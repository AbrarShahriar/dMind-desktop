import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/ext-language_tools'
import { useAppStore } from '../../store'

const editorBackground = '#090f13'

export default function Editor() {
  const editorData = useAppStore((state) => state.editorData)
  const setEditorData = useAppStore((state) => state.setEditorData)
  const setCurrentNoteSaved = useAppStore((state) => state.setCurrentNoteSaved)

  const handleEditorOnChange = (newVal) => {
    setEditorData(newVal)
    setCurrentNoteSaved(false)
  }
  return (
    <AceEditor
      style={{
        background: editorBackground,
        width: '100%',
        height: '100%',
        marginTop: '10px'
      }}
      placeholder="Start learning..."
      mode="markdown"
      theme="twilight"
      onChange={handleEditorOnChange}
      fontSize={18}
      lineHeight={19}
      showPrintMargin={false}
      showGutter={false}
      highlightActiveLine={true}
      value={editorData}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: false,
        tabSize: 2,
        wrap: true
      }}
    />
  )
}
