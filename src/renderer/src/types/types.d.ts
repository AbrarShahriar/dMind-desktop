// State Types
import { Connection } from 'jsstore'
import { ActionTypes } from './enums'

export interface AppStates {
  editorData?: string
  currentNoteSaved?: boolean
  dbConnection?: null | Connection
  currentNoteId?: any
  previouslyCreatedNoteOpened?: boolean
  tabs?: any
}

export interface Action {
  type: ActionTypes
  payload: AppStates
}

// Component Class
export interface ComponentInputs {
  el: string
  classList?: string[] | null
  text?: string | null
  _html?: string | null
  modifier?: any
  styles?: {} | null | CSSStyleDeclaration
  dataset?: any
}

// Retrieved Note Interface
export interface IRetrievedNote {
  id: any
  body: string
}
