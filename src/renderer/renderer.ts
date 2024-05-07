import mermaid from 'mermaid'
import Tabby from 'tabbyjs'
import hljs from 'highlight.js'
import './libs/mathtex-script-type.mjs'
import Swal from 'sweetalert2'
import { dispatch, initialState } from './state.js'

import 'highlight.js/styles/github-dark.min.css'
import 'tabbyjs/dist/css/tabby-ui.min.css'
import 'katex/dist/katex.min.css'
import 'siimple-icons/siimple-icons.css'
import './styles/index.css'
import { ActionTypes, FsResponse, NOTE_RESPONSE_STATUS } from '../types.js'
import Theme from './classes/Theme.js'
import { parseMd } from './parser/parser.js'
import { renderRetrievedNotes, select, selectAll } from './utils.js'

window.addEventListener('DOMContentLoaded', async () => {
  await renderRetrievedNotes()
})

// Set Theme
const theme = new Theme()
theme.setTheme('dark')

const elements = {
  content: select<HTMLPreElement>('.content'),
  editor: select<HTMLDivElement>('.editor'),
  editorInput: select<HTMLTextAreaElement>('.editor_input'),
  renderBtn: select<HTMLButtonElement>('.btn_render'),
  saveBtn: select<HTMLButtonElement>('.btn_save'),
  noteList: select<HTMLDivElement>('.note_list'),
  newNoteBtnList: selectAll('.btn_new_note'),
  drawer: select<HTMLDivElement>('.drawer')
}

// Library Initialization
mermaid.initialize({ startOnLoad: false, theme: 'dark' })
const tabs = new Tabby('[data-tabs]')
dispatch({
  type: ActionTypes.SetTabs,
  payload: { tabs }
})

// Event Listeners
elements.editorInput?.addEventListener('input', (e) => {
  dispatch({
    type: ActionTypes.SetEditorData,
    payload: { editorData: (e.target as HTMLTextAreaElement).value }
  })
  dispatch({
    type: ActionTypes.UpdateCurrentNoteSavedState,
    payload: { currentNoteSaved: false }
  })
})

elements.renderBtn?.addEventListener('click', async () => {
  if (elements.content) {
    elements.content.innerHTML = parseMd(initialState.editorData as string)
    hljs.highlightAll()
    await mermaid.run()
  }
})

elements.saveBtn?.addEventListener('click', async () => {
  let response: null | FsResponse = null
  const isEditorEmpty = initialState.editorData == '' ? true : false

  if (isEditorEmpty) {
    return Swal.fire({
      icon: 'error',
      text: 'Write Something!'
    })
  }

  if (initialState.previouslyCreatedNoteOpened || initialState.currentNoteId) {
    response = await window.api.updateNote({
      noteId: initialState.currentNoteId as string,
      noteBody: initialState.editorData as string
    })
  } else {
    response = await window.api.createNote(initialState.editorData as string)
  }

  if (response?.status == NOTE_RESPONSE_STATUS.NOTE_ADDED) {
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: true }
    })
    dispatch({
      type: ActionTypes.SetCurrentNoteId,
      payload: { currentNoteId: response.payload.noteId as string }
    })
  } else if (response?.status == NOTE_RESPONSE_STATUS.NOTE_UPDATED) {
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: true }
    })
  }

  return renderRetrievedNotes()
})

elements.newNoteBtnList?.forEach((newNoteBtn) => {
  newNoteBtn.addEventListener('click', () => {
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: false }
    })
    dispatch({
      type: ActionTypes.SetCurrentNoteId,
      payload: { currentNoteId: null }
    })
    dispatch({
      type: ActionTypes.SetEditorData,
      payload: { editorData: '' }
    })
    dispatch({
      type: ActionTypes.SetPreviouslyCreatedNoteOpened,
      payload: { previouslyCreatedNoteOpened: false }
    })

    elements.content.innerHTML = ''

    tabs.toggle('#editor')
  })
})
