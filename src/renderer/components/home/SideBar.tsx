import { useEffect, useState } from 'react'
import { Sidebar, SubMenu, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar'
import styles from './SideBar.module.scss'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  ModalDialog
} from '@mui/joy'
import {
  ArticleOutlined,
  ClearOutlined,
  CreateNewFolderOutlined,
  PostAddOutlined,
  Settings,
  SwitchRight,
  WarningRounded,
  WidgetsOutlined
} from '@mui/icons-material'
import Tooltip from '../utils/Tooltip'
import { IRetrievedNote, NOTE_RESPONSE_STATUS } from '../../../types'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router-dom'

const sideBarBgColor = '#0c2f39'
const mdCharacters = ['#', '*', '_', '$', '%', '^', '-', '~']

export default function SideBar() {
  const navigate = useNavigate()

  const [deleteCandidateId, setDeleteCandidateId] = useState('')
  const [noteDeleteModalOpen, setNoteDeleteModalOpen] = useState(false)
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

  useEffect(() => {
    window.api.getNotes().then((data) => setNotes(data))
  }, [refreshNotes])

  const handleNoteClick = (note: IRetrievedNote) => {
    setEditorData(note.body)
    setCurrentNoteId(note.id)
    setpreviouslyCreatedNoteOpened(true)
    setCurrentNoteSaved(true)

    navigate('/')
  }

  const handleNewNoteClick = () => {
    setCurrentNoteSaved(false)
    setCurrentNoteId('')
    resetEditor()
    setpreviouslyCreatedNoteOpened(false)
  }

  const handleNoteDeleteModal = (e, noteId) => {
    e.preventDefault()
    e.stopPropagation()
    setNoteDeleteModalOpen(true)
    setDeleteCandidateId(noteId)
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
              <Tooltip hide={collapsed} label="Add Collection">
                <IconButton>
                  <CreateNewFolderOutlined style={{ color: 'white' }} />
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
            icon={
              <Tooltip label="Notes" position="right">
                <ArticleOutlined />
              </Tooltip>
            }
          >
            {notes.map((note) => (
              <MenuItem
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
            icon={
              <Tooltip label="Extensions" position="right">
                <WidgetsOutlined />
              </Tooltip>
            }
            onClick={() => navigate('/extensions')}
          >
            Extensions
          </MenuItem>
          <MenuItem
            icon={
              <Tooltip label="Settings" position="right">
                <Settings />
              </Tooltip>
            }
            onClick={() => navigate('/settings')}
          >
            Settings
          </MenuItem>
        </Menu>
      </Sidebar>

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
    </>
  )
}
