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
