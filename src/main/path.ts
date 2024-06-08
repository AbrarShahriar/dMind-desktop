import { app } from 'electron'
import path from 'path'

export const DEFAULT_PATH = path.join(app.getPath('documents'), '/dMind/')
export const resolvePath = (pathOfFile: string) => path.join(DEFAULT_PATH, pathOfFile)
