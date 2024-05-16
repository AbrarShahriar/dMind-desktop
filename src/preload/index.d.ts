import { ElectronAPI } from '@electron-toolkit/preload'
import { INote, InterfaceAPI } from '../types'

declare global {
  interface Window {
    electronApi: ElectronAPI
    api: InterfaceAPI
  }
}
