import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { EVENT_NAMES, InterfaceAPI } from '../types'

// Custom APIs for renderer
const api: InterfaceAPI = {
  createNote: async (noteBody: string) =>
    await ipcRenderer.invoke(EVENT_NAMES.HANDLE_NOTE_SAVE, noteBody),
  updateNote: async ({ noteId, noteBody }: { noteId: string; noteBody: string }) =>
    await ipcRenderer.invoke(EVENT_NAMES.HANDLE_NOTE_UPDATE, { noteId, noteBody }),
  deleteNote: async (noteId: string) =>
    await ipcRenderer.invoke(EVENT_NAMES.HANDLE_NOTE_DELETE, noteId),
  getNotes: async () => await ipcRenderer.invoke(EVENT_NAMES.GET_NOTES),

  getPluginConfig: async () => await ipcRenderer.invoke(EVENT_NAMES.GET_PLUGIN_CONFIG),
  udpatePluginConfig: async (updatedConfig) =>
    await ipcRenderer.invoke(EVENT_NAMES.UPDATE_PLUGIN_CONFIG, updatedConfig),

  relaunch: async () => await ipcRenderer.invoke(EVENT_NAMES.RELAUNCH),
  downloadNote: async (url) => await ipcRenderer.invoke(EVENT_NAMES.DOWNLOAD_NOTE, url),
  onDownloadNoteProgress: (callback) =>
    ipcRenderer.on('note-download:progress', (_, args) => callback(args)),
  onDownloadNoteCompleted: (callback) =>
    ipcRenderer.on('note-download:complete', (_, args) => callback(args))
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronApi', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
