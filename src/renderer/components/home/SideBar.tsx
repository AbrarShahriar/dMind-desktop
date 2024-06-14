import { useEffect, useState } from 'react'
import { Sidebar, SubMenu, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar'
import styles from './SideBar.module.scss'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Stack
} from '@mui/joy'
import {
  ArticleOutlined,
  CancelOutlined,
  ClearOutlined,
  CloudDownloadOutlined,
  FileDownloadOutlined,
  PostAddOutlined,
  SwitchRight,
  WarningRounded,
  WidgetsOutlined
} from '@mui/icons-material'
import Tooltip from '../utils/Tooltip'
import { IRetrievedNote, NOTE_RESPONSE_STATUS } from '../../../types'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router-dom'
import Snackbar from '../utils/Snackbar'

const sideBarBgColor = '#0c2f39'
const mdCharacters = ['#', '*', '_', '$', '%', '^', '-', '~']

export default function SideBar() {
  const navigate = useNavigate()

  const [deleteCandidateId, setDeleteCandidateId] = useState('')
  const [noteDeleteModalOpen, setNoteDeleteModalOpen] = useState(false)
  const [importNoteModalOpen, setImportNoteModalOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [notes, setNotes] = useState<IRetrievedNote[]>([])

  const refreshNotes = useAppStore((state) => state.refreshNotes)
  const currentNoteId = useAppStore((state) => state.currentNoteId)

  const updateRefreshNotes = useAppStore((state) => state.updateRefreshNotes)
  const resetEditor = useAppStore((state) => state.resetEditor)
  const setEditorData = useAppStore((state) => state.setEditorData)
  const setCurrentNoteId = useAppStore((state) => state.setCurrentNoteId)
  const setpreviouslyCreatedNoteOpened = useAppStore(
    (state) => state.setpreviouslyCreatedNoteOpened
  )
  const setCurrentNoteSaved = useAppStore((state) => state.setCurrentNoteSaved)
  const setIndex = useAppStore((state) => state.setTabIndex)

  const [noteLinkText, setNoteLinkText] = useState('')
  const [noteDownloadLoading, setNoteDownloadLoading] = useState(false)

  const [noteDownloadedSnackbarOpen, setNoteDownloadedSnackbarOpen] = useState(false)

  useEffect(() => {
    window.api.getNotes().then((data) => setNotes(data))
  }, [refreshNotes])

  const handleNoteClick = (note: IRetrievedNote) => {
    setEditorData(note.body)
    setCurrentNoteId(note.id)
    setpreviouslyCreatedNoteOpened(true)
    setCurrentNoteSaved(true)
    setIndex(0)
    navigate('/')
  }

  const handleNewNoteClick = () => {
    setIndex(0)
    setCurrentNoteSaved(false)
    setCurrentNoteId('')
    resetEditor()
    setpreviouslyCreatedNoteOpened(false)
    navigate('/')
  }

  const handleNoteDeleteModal = (e, noteId) => {
    e.preventDefault()
    e.stopPropagation()
    setNoteDeleteModalOpen(true)
    setDeleteCandidateId(noteId)
  }

  const handleImportNote = () => {
    setImportNoteModalOpen(true)
  }

  const confirmDeleteNote = async () => {
    const res = await window.api.deleteNote(deleteCandidateId)

    if (res.status == NOTE_RESPONSE_STATUS.NOTE_DELETED) {
      resetEditor()
      setCurrentNoteId('')
      setpreviouslyCreatedNoteOpened(false)
      setCurrentNoteSaved(false)
      updateRefreshNotes()
    }

    return setNoteDeleteModalOpen(false)
  }

  const confirmImportNote = async () => {
    setNoteDownloadLoading(true)

    await window.api.downloadNote(noteLinkText)
  }

  useEffect(() => {
    window.api.onDownloadNoteProgress(() => setNoteDownloadLoading(true))
    window.api.onDownloadNoteCompleted(() => {
      setNoteDownloadedSnackbarOpen(true)
      setNoteDownloadLoading(false)
      setImportNoteModalOpen(false)
      setNoteLinkText('')

      window.api.getNotes().then((data) => setNotes(data))
    })
  }, [])

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        className={styles.sidebar}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: sideBarBgColor,
            outline: `2px solid ${sideBarBgColor}`,
            borderRight: `2px solid rgba(255,255,255,0.25)`
          }
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              color: 'white',
              backgroundColor: active ? '#335B8C' : sideBarBgColor,
              '&:hover': {
                backgroundColor: '#335B8C'
              }
            })
          }}
        >
          <div className={styles.toggleSidebar}>
            <div
              className={`${styles.actions} ${styles['opacity-0']} ${!collapsed && styles['opacity-1']}`}
            >
              <Tooltip hide={collapsed} label="Add Note">
                <IconButton onClick={handleNewNoteClick}>
                  <PostAddOutlined style={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
              {/* <Tooltip hide={collapsed} label="Add Collection">
                <IconButton>
                  <CreateNewFolderOutlined style={{ color: 'white' }} />
                </IconButton>
              </Tooltip> */}
              <Tooltip hide={collapsed} label="Import Note">
                <IconButton onClick={handleImportNote}>
                  <CloudDownloadOutlined style={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </div>
            <Tooltip label={collapsed ? 'Open Sidebar' : 'Hide Sidebar'}>
              <IconButton
                className={`${styles.toggleButton} ${collapsed ? styles.toggleButton_closed : styles.toggleButton_opened}`}
                color="neutral"
                onClick={() => setCollapsed(!collapsed)}
              >
                <SwitchRight style={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
          </div>

          <SubMenu
            label="Notes"
            style={{ fontWeight: 600 }}
            icon={
              <Tooltip label="Notes" position="right">
                <ArticleOutlined />
              </Tooltip>
            }
          >
            {notes.map((note) => (
              <MenuItem
                style={{ fontSize: 15 }}
                active={currentNoteId === note.id}
                key={note.id}
                onClick={() => handleNoteClick(note)}
                suffix={
                  <IconButton onClick={(e) => handleNoteDeleteModal(e, note.id)}>
                    <ClearOutlined />
                  </IconButton>
                }
              >
                {mdCharacters.includes(note.body[0])
                  ? note.body.slice(1, note.body.length).trim()
                  : note.body}
              </MenuItem>
            ))}
          </SubMenu>
          <MenuItem
            style={{ fontWeight: 600 }}
            icon={
              <Tooltip label="Extensions" position="right">
                <WidgetsOutlined />
              </Tooltip>
            }
            onClick={() => navigate('extensions')}
          >
            Extensions
          </MenuItem>
          {/* <MenuItem
            style={{ fontWeight: 600 }}
            icon={
              <Tooltip label="Settings" position="right">
                <Settings />
              </Tooltip>
            }
            onClick={() => navigate('settings')}
          >
            Settings
          </MenuItem> */}
        </Menu>
      </Sidebar>
      {/* NOTE DELETE */}
      <Modal open={noteDeleteModalOpen} onClose={() => setNoteDeleteModalOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRounded />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>Are you sure you want to discard this note?</DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => confirmDeleteNote()}>
              Discard note
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setNoteDeleteModalOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
      {/* IMPORT NOTE */}
      <Modal open={importNoteModalOpen} onClose={() => setImportNoteModalOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <FileDownloadOutlined />
            Import Note
          </DialogTitle>
          <Divider />
          <DialogContent>Paste the remote note link to import.</DialogContent>

          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Note Link:</FormLabel>
              <Input
                autoFocus
                required
                value={noteLinkText}
                onChange={(e) => setNoteLinkText(e.currentTarget.value)}
              />
            </FormControl>
          </Stack>
          <DialogActions>
            <Button
              loading={noteDownloadLoading}
              variant="solid"
              color="primary"
              onClick={() => confirmImportNote()}
            >
              Import
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setImportNoteModalOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      {/* NOTE DOWNLOADES */}
      <Snackbar
        color="success"
        open={noteDownloadedSnackbarOpen}
        setOpen={() => setNoteDownloadedSnackbarOpen(false)}
        icon={<CancelOutlined />}
        showCloseButton
        title="Note Imported!!"
      />
    </>
  )
}
