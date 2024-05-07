// State Types
import { Connection } from 'jsstore'

export enum EVENT_NAMES {
  HANDLE_NOTE_SAVE = 'handle_note_save',
  HANDLE_NOTE_UPDATE = 'handle_note_update',
  HANDLE_NOTE_DELETE = 'handle_note_delete',
  GET_NOTES = 'get_notes'
}

// WINDOW Type
export interface InterfaceAPI {
  createNote: (noteBody: string) => Promise<FsResponse>
  updateNote: ({ noteId, noteBody }: { noteId: string; noteBody: string }) => Promise<FsResponse>
  deleteNote: (noteId: string) => Promise<FsResponse>
  getNotes: () => Promise<any[]>
}

// Note Interface
export interface INote {
  id: string
  body: string
  createdAt: Date
  updatedAt: Date
}

// NOTE RESPONSE STATUS
export enum NOTE_RESPONSE_STATUS {
  NOTE_ADDED,
  NOTE_UPDATED,
  NOTE_DELETED,
  NOTE_ERROR
}

// RESPONSE TYPE
export interface FsResponse {
  status: NOTE_RESPONSE_STATUS
  error?: unknown
  payload?: any
}

// PARSER TYPES
export enum MediaTypes {
  Markdown = 'markdown',
  Code = 'code',
  Latex = 'latex',
  Diagram = 'diagram',
  Table = 'table'
}

// STATE TYPES
export enum ActionTypes {
  SetEditorData = 'set_editor_data',
  UpdateCurrentNoteSavedState = 'update_current_note_saved_state',
  SetDbConnection = 'set_db_connection',
  SetCurrentNoteId = 'set_current_note_id',
  SetPreviouslyCreatedNoteOpened = 'set_previously_created_note_opened',
  SetTabs = 'set_tabs'
}

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
