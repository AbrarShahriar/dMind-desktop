export enum MediaTypes {
  Markdown = "markdown",
  Code = "code",
  Latex = "latex",
  Diagram = "diagram",
  Table = "table",
}

export enum ActionTypes {
  SetEditorData = "set_editor_data",
  UpdateCurrentNoteSavedState = "update_current_note_saved_state",
  SetDbConnection = "set_db_connection",
  SetCurrentNoteId = "set_current_note_id",
  SetPreviouslyCreatedNoteOpened = "set_previously_created_note_opened",
  SetTabs = "set_tabs",
}
