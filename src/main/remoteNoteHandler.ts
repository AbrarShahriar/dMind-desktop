import { BrowserWindow } from 'electron'
import { download } from 'electron-dl'
import { dialog } from 'electron'
import { DEFAULT_PATH } from './path'
import { randomUUID } from 'crypto'

export const downloadRemoteNote = async (url, mainWindow: BrowserWindow) => {
  console.log(url)
  //   mainWindow.webContents.downloadURL(url)

  const fileName = randomUUID() + '.d'

  const dialogResult = dialog.showSaveDialogSync(mainWindow, {
    defaultPath: `${DEFAULT_PATH}/${fileName}`
  })

  if (dialogResult) {
    download(mainWindow, url, {
      directory: DEFAULT_PATH,
      filename: fileName,
      onProgress: (progress) => mainWindow.webContents.send('note-download:progress', progress),
      onCompleted: (item) => mainWindow.webContents.send('note-download:complete', item)
    })
  }
}
