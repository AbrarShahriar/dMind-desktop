import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { EVENT_NAMES } from '../types'
import { createNote, deleteNote, getNotes, updateNote } from './file_manager'
import { Config } from './configHandler'
import { downloadRemoteNote } from './remoteNoteHandler'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      devTools: !(app.isPackaged || process.env?.NODE_ENV === 'development')
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Download Note
  ipcMain.handle(
    EVENT_NAMES.DOWNLOAD_NOTE,
    async (_, url) => await downloadRemoteNote(url, mainWindow)
  )
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.dMind')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // HANDLE FILES
  ipcMain.handle(EVENT_NAMES.HANDLE_NOTE_SAVE, async (_, noteBody) => await createNote(noteBody))
  ipcMain.handle(
    EVENT_NAMES.HANDLE_NOTE_UPDATE,
    async (_, { noteId, noteBody }: { noteId: string; noteBody: string }) =>
      await updateNote(noteId, noteBody)
  )
  ipcMain.handle(EVENT_NAMES.HANDLE_NOTE_DELETE, async (_, noteId) => await deleteNote(noteId))
  ipcMain.handle(EVENT_NAMES.GET_NOTES, getNotes)

  // Setup Default Configs
  Config.PluignConfig.setupPluginConfig()
  ipcMain.handle(EVENT_NAMES.GET_PLUGIN_CONFIG, Config.PluignConfig.getPluginConfig)
  ipcMain.handle(EVENT_NAMES.UPDATE_PLUGIN_CONFIG, async (_, updatedConfig) =>
    Config.PluignConfig.updatePluginConfig(updatedConfig)
  )

  // Setup Restart
  ipcMain.handle(EVENT_NAMES.RELAUNCH, () => {
    console.log('Restarting')

    app.relaunch()
    app.exit()
  })

  // Create Window
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
