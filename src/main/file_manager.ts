import * as jetpack from 'fs-jetpack'
import { FsResponse, NOTE_RESPONSE_STATUS } from '../types'
import { app } from 'electron'
import path from 'path'
import { randomUUID } from 'crypto'

const DEFAULT_PATH = path.join(app.getPath('documents'), '/dMind/')

if (!jetpack.exists(DEFAULT_PATH)) {
  jetpack.dir(DEFAULT_PATH)
}

const resolvePath = (filename: string) => path.join(DEFAULT_PATH, filename)

export async function createNote(noteBody: string): Promise<FsResponse> {
  console.log('creating new note')

  try {
    const id = randomUUID() + '.d'
    let notePath = resolvePath(id)

    await jetpack.writeAsync(notePath, noteBody)
    console.log('new note added')

    return { status: NOTE_RESPONSE_STATUS.NOTE_ADDED, payload: { noteId: id } }
  } catch (error) {
    return { status: NOTE_RESPONSE_STATUS.NOTE_ERROR, error }
  }
}

export async function updateNote(noteId: string, newNoteBody: string): Promise<FsResponse> {
  console.log(noteId)
  let notePath = resolvePath(noteId as string)
  console.log('updating', notePath)
  let noteExists = await jetpack.existsAsync(notePath)

  if (!noteExists) {
    return { status: NOTE_RESPONSE_STATUS.NOTE_ERROR, error: { message: 'Unknown Error!' } }
  }

  try {
    await jetpack.writeAsync(notePath, newNoteBody)
    console.log('note updated')
    return { status: NOTE_RESPONSE_STATUS.NOTE_UPDATED }
  } catch (error) {
    return { status: NOTE_RESPONSE_STATUS.NOTE_ERROR, error }
  }
}

export async function deleteNote(id: string): Promise<FsResponse> {
  const notePath = resolvePath(id)
  console.log('deleting', notePath)

  try {
    await jetpack.removeAsync(notePath)
    console.log('note deleted')
  } catch (error) {
    return { status: NOTE_RESPONSE_STATUS.NOTE_ERROR, error }
  }

  return { status: NOTE_RESPONSE_STATUS.NOTE_DELETED }
}

export async function getNotes(): Promise<any[]> {
  const path = DEFAULT_PATH
  let results: any = []

  const paths = (await jetpack.findAsync(path)) || []

  paths.forEach((path) => {
    let file = jetpack.read(path)
    let time = jetpack.inspect(path, { times: true })

    let lastIndex = path.split('\\').length - 1
    results.push({
      id: path.split('\\')[lastIndex],
      body: file,
      createdAt: time?.birthTime
    })
  })

  return await results.sort((a, b) => b.createdAt - a.createdAt)
}
