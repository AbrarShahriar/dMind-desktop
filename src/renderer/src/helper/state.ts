import { ActionTypes } from '../types/enums'
import { Action, AppStates } from '../types/types'
import { autoResizeTextarea, select, updateSaveButton } from './utils'

export let initialState: AppStates = {
  editorData: '',
  currentNoteSaved: false,
  dbConnection: null,
  currentNoteId: null,
  previouslyCreatedNoteOpened: false,
  tabs: null
}

export const dispatch = (action: Action): void | AppStates => {
  // console.log(action.type, action.payload)

  switch (action.type) {
    case ActionTypes.SetEditorData:
      initialState = {
        ...initialState,
        editorData: action.payload.editorData
      }
      select<HTMLTextAreaElement>('.editor_input').value = initialState.editorData as string
      autoResizeTextarea()
      return

    case ActionTypes.UpdateCurrentNoteSavedState:
      initialState = {
        ...initialState,
        currentNoteSaved: action.payload.currentNoteSaved
      }
      updateSaveButton()
      return

    case ActionTypes.SetCurrentNoteId:
      initialState = {
        ...initialState,
        currentNoteId: action.payload.currentNoteId
      }
      return

    case ActionTypes.SetPreviouslyCreatedNoteOpened:
      initialState = {
        ...initialState,
        previouslyCreatedNoteOpened: action.payload.previouslyCreatedNoteOpened
      }
      return

    case ActionTypes.SetTabs:
      initialState = {
        ...initialState,
        tabs: action.payload.tabs
      }
      return

    case ActionTypes.SetDbConnection:
      initialState = {
        ...initialState,
        dbConnection: action.payload.dbConnection
      }
      return

    default:
      return initialState
  }
}
