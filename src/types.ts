// State Types
import ace from 'ace-builds'
import React from 'react'

export enum EVENT_NAMES {
  HANDLE_NOTE_SAVE = 'handle_note_save',
  HANDLE_NOTE_UPDATE = 'handle_note_update',
  HANDLE_NOTE_DELETE = 'handle_note_delete',
  GET_NOTES = 'get_notes',

  GET_PLUGIN_CONFIG = 'update_plugin_config',
  UPDATE_PLUGIN_CONFIG = 'get_plugin_config',

  RELAUNCH = 'relaunch',
  DOWNLOAD_NOTE = 'download_note'
}

// RULE TYPES
type TemplateFunction = ((val1: any) => any) | ((val1: any, val2: any) => any)
export interface IRule {
  type: string
  regex: RegExp
  template: string | TemplateFunction
  disabled: boolean
}

// WINDOW Type
export interface InterfaceAPI {
  createNote: (noteBody: string) => Promise<FsResponse>
  updateNote: ({ noteId, noteBody }: { noteId: string; noteBody: string }) => Promise<FsResponse>
  deleteNote: (noteId: string) => Promise<FsResponse>
  getNotes: () => Promise<IRetrievedNote[]>

  getPluginConfig: () => Promise<IExtensionCard[]>
  udpatePluginConfig: (updatedConfig: IExtensionCard[]) => Promise<void>

  relaunch: () => Promise<void>

  downloadNote: (url: string) => Promise<void>

  onDownloadNoteProgress: (callback: (args: any) => void) => void
  onDownloadNoteCompleted: (callback: (args: any) => void) => void
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
  NOTE_ERROR,

  PLUGIN_CONFIG_UPDATED,

  UNKNOWN_ERROR
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
  SetEditor = 'set_editor',
  SetEditorData = 'set_editor_data',
  UpdateCurrentNoteSavedState = 'update_current_note_saved_state',
  SetDbConnection = 'set_db_connection',
  SetCurrentNoteId = 'set_current_note_id',
  SetPreviouslyCreatedNoteOpened = 'set_previously_created_note_opened',
  SetTabs = 'set_tabs'
}

export interface AppStates {
  editor?: null | ace.Ace.Editor
  editorData?: string
  currentNoteSaved?: boolean
  // dbConnection?: null | Connection
  dbConnection?: any
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

// Extension UI Types

export interface IExtensionCard {
  type: string | string[]
  title: string
  desc: string
  extOn: boolean
  url: string
  topic: string
  topicIcon: React.ReactElement
}

// PARSER NODE TYPES
export const MD_Types = {
  HEADER: 'header',
  TEXT_FORMATTING: {
    INLINE_CODE: 'inline_code',
    BOLD: 'bold',
    ITALIC: 'italic',
    STRIKETHROUGH: 'strikethrough',
    HIGHLIGHT: 'highlight',
    UNDERLINE: 'underline'
  },
  GRAPHICS: { LINE: 'line' },
  MEDIA: { IMAGE: 'image', CHECKBOX: 'checkbox' },
  LINK: 'LINK',
  INDENTATION: { LINE_BREAK: 'linebrake', TAB: 'tab' },
  LIST: { UL: 'list_ul', OL: 'list_ol' },
  BLOCK: { QUOTE: 'quote', CODE: 'code', DIAGRAM: 'diagram', TABLE: 'table' },
  MATH: { DISPLAY_MODE: 'display-mode', INLINE_MODE: 'inline-mode' },
  PLOT: 'function-plot'
}
