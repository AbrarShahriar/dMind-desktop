import Component from '../classes/Component.js'
import { ActionTypes } from '../../types/enums.js'
import { dispatch, initialState } from '../state.js'
import { autoResizeTextarea, renderRetrievedNotes, select, truncateText } from '../utils.js'
import Swal from 'sweetalert2'
import { NOTE_RESPONSE_STATUS } from '../../../../types.js'

const mdCharacters = ['#', '*', '_', '$', '%', '^', '-', '~']

interface NoteProps {
  id: any
  body: string
}

export default function Note({ id, body }: NoteProps) {
  let note = new Component({ el: 'div', classList: ['note'] })

  let noteTitle = truncateText(body.split('\n')[0], 5)

  let title = new Component({
    el: 'span',
    classList: ['title'],
    text: `${
      mdCharacters.includes(noteTitle[0]) ? noteTitle.slice(1, noteTitle.length).trim() : noteTitle
    }`
  })

  let dltBtn = new Component({
    el: 'i',
    classList: ['si-x', 'btn_icon'],
    styles: { fontSize: '20px' }
  })

  title.addListener(Component.ListenerTypes.Click, () => {
    initialState.tabs.toggle('#editor')

    dispatch({
      type: ActionTypes.SetEditorData,
      payload: { editorData: body }
    })

    dispatch({
      type: ActionTypes.SetCurrentNoteId,
      payload: { currentNoteId: id }
    })

    dispatch({
      type: ActionTypes.SetPreviouslyCreatedNoteOpened,
      payload: { previouslyCreatedNoteOpened: true }
    })

    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: true }
    })

    select<HTMLTextAreaElement>('.editor_input').value = body
    autoResizeTextarea()
  })

  dltBtn.addListener(Component.ListenerTypes.Click, async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Delete Node
        let res = await window.api.deleteNote(id)

        if (res.status == NOTE_RESPONSE_STATUS.NOTE_DELETED) {
          dispatch({
            type: ActionTypes.SetEditorData,
            payload: { editorData: '' }
          })

          dispatch({
            type: ActionTypes.SetCurrentNoteId,
            payload: { currentNoteId: null }
          })

          dispatch({
            type: ActionTypes.SetPreviouslyCreatedNoteOpened,
            payload: { previouslyCreatedNoteOpened: false }
          })

          dispatch({
            type: ActionTypes.UpdateCurrentNoteSavedState,
            payload: { currentNoteSaved: false }
          })

          select<HTMLPreElement>('.content').innerHTML = ''

          renderRetrievedNotes()
        } else {
          Swal.fire({
            icon: 'error',
            title: "Couldn't delete"
          })
        }
      }
    })
  })

  note.addChildren([title, dltBtn])

  return note.getDomNode()
}
