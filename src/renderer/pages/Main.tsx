import { IconButton, Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import styles from './Main.module.scss'
import { ModeEdit, AutoAwesome, Done, Save, CancelOutlined } from '@mui/icons-material'
import { useAppStore } from '../store'
import mermaid from 'mermaid'
import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { FsResponse, NOTE_RESPONSE_STATUS } from '../../types'
import Snackbar from '../components/utils/Snackbar'
import Tooltip from '../components/utils/Tooltip'
import Editor from '../components/home/Editor'
import Preview from '../components/home/Preview'

const editorBackground = '#090f13'
const topbarBackground = '#09191f'

export default function Main() {
  // const navigate = useNavigate()

  const [editorEmptySnackbarOpen, setEditorEmptySnackbarOpen] = useState(false)
  const [saveSuccessSnackbarOpen, setSaveSuccessSnackbarOpen] = useState(false)
  const editorData = useAppStore((state) => state.editorData)
  const previouslyCreatedNoteOpened = useAppStore((state) => state.previouslyCreatedNoteOpened)
  const currentNoteId = useAppStore((state) => state.currentNoteId)
  const currentNoteSaved = useAppStore((state) => state.currentNoteSaved)
  const setCurrentNoteId = useAppStore((state) => state.setCurrentNoteId)
  const setCurrentNoteSaved = useAppStore((state) => state.setCurrentNoteSaved)
  const updateRefreshNotes = useAppStore((state) => state.updateRefreshNotes)

  const index = useAppStore((state) => state.tabIndex)
  const setIndex = useAppStore((state) => state.setTabIndex)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'dark' })
  }, [])

  const handleSave = async () => {
    let response: null | FsResponse = null
    if (!editorData) {
      return setEditorEmptySnackbarOpen(true)
    }

    if (previouslyCreatedNoteOpened || currentNoteId) {
      response = await window.api.updateNote({
        noteId: currentNoteId as string,
        noteBody: editorData as string
      })
    } else {
      response = await window.api.createNote(editorData as string)
    }

    if (!response.error) {
      setSaveSuccessSnackbarOpen(true)
    }

    if (response?.status == NOTE_RESPONSE_STATUS.NOTE_ADDED) {
      setCurrentNoteSaved(true)
      setCurrentNoteId(response.payload.noteId)
    } else if (response?.status == NOTE_RESPONSE_STATUS.NOTE_UPDATED) {
      setCurrentNoteSaved(true)
    }

    updateRefreshNotes()
  }
  return (
    <>
      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.tabs}>
            <Tabs
              value={index}
              onChange={(_, value) => setIndex(value as number)}
              sx={{
                width: '100%',
                height: '100%'
              }}
            >
              <TabList
                sx={{ width: '100%', background: topbarBackground, padding: '20px 20px 0 20px' }}
              >
                <Tab indicatorPlacement="bottom">
                  <ModeEdit style={{ color: 'white' }} /> Editor
                </Tab>
                <Tab indicatorPlacement="bottom">
                  <AutoAwesome style={{ color: 'white' }} /> Preview
                </Tab>
                <div className={styles.actions}>
                  {/* <Tooltip label="Export">
                    <IconButton
                      variant="plain"
                      color="neutral"
                      sx={{ ':hover': { background: 'transparent' } }}
                      onClick={() => navigate('/test')}
                    >
                      <Upload style={{ color: 'white' }} />
                    </IconButton>
                  </Tooltip> */}
                  <Tooltip label="Save">
                    <IconButton
                      disabled={currentNoteSaved}
                      onClick={handleSave}
                      variant="plain"
                      color="neutral"
                      sx={{ ':hover': { background: 'transparent' } }}
                    >
                      {currentNoteSaved ? <Done /> : <Save style={{ color: 'white' }} />}
                    </IconButton>
                  </Tooltip>
                </div>
              </TabList>
              <TabPanel
                value={0}
                sx={{ padding: '20px', height: '100%', background: editorBackground }}
              >
                <Editor />
              </TabPanel>
              <TabPanel
                sx={{ padding: '20px', height: '100%', background: editorBackground }}
                value={1}
              >
                <Preview />
              </TabPanel>
            </Tabs>
          </div>
        </header>
      </main>

      {/* EDITOR EMPTY */}
      <Snackbar
        color="danger"
        open={editorEmptySnackbarOpen}
        setOpen={() => setEditorEmptySnackbarOpen(false)}
        icon={<CancelOutlined />}
        showCloseButton
        title="Write Something!"
      />

      {/* ERROR */}
      <Snackbar
        open={saveSuccessSnackbarOpen}
        setOpen={() => setSaveSuccessSnackbarOpen(false)}
        icon={<Done />}
        showCloseButton
        title="Note Saved!!"
      />
    </>
  )
}
