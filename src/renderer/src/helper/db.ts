// import { Connection, DATA_TYPE } from 'jsstore'
// import Note from './components/Note'
// import { initialState } from './state'
// import { select } from './utils'
// import { IRetrievedNote } from '../types/types'

// export const setupDb = async () => {
//   const DB_NAME = 'dMind-db'
//   console.log(await window.api.getWorkerPath())

//   const connection = new Connection(new Worker(await window.api.getWorkerPath()))

//   var tblNotes = {
//     name: 'Notes',
//     columns: {
//       id: { primaryKey: true, autoIncrement: true },
//       body: { notNull: true, dataType: DATA_TYPE.String },
//       createdAt: { notNull: true, dataType: DATA_TYPE.DateTime, default: new Date() },
//       updatedAt: { notNull: true, dataType: DATA_TYPE.DateTime, default: new Date() }
//     }
//   }

//   const db = {
//     name: DB_NAME,
//     tables: [tblNotes]
//   }

//   var isDbCreated = await connection.initDb(db)

//   if (isDbCreated) {
//     console.log('Db Created & connection is opened')
//   } else {
//     console.log('Connection is opened')
//   }

//   return connection
// }

// export const updateCurrentNote = async () => {
//   let noOfRowsUpdated = await (initialState.dbConnection as Connection).update({
//     in: 'Notes',
//     where: {
//       id: initialState.currentNoteId
//     },
//     set: {
//       updatedAt: new Date(),
//       body: initialState.editorData
//     }
//   })

//   await renderRetrievedNoteList()
//   return noOfRowsUpdated
// }

// export const insertNewNote = async () => {
//   let newlyCreatedNote = await (initialState.dbConnection as Connection).insert({
//     into: 'Notes',
//     values: [
//       {
//         body: initialState.editorData
//       }
//     ],
//     return: true
//   })
//   await renderRetrievedNoteList()
//   return newlyCreatedNote
// }

// export const deleteCurrentNode = async (id) => {
//   let rowsDeleted = await (initialState.dbConnection as Connection).remove({
//     from: 'Notes',
//     where: {
//       id
//     }
//   })
//   await renderRetrievedNoteList()
//   return rowsDeleted
// }

// export const renderRetrievedNoteList = async () => {
//   const results = await (initialState.dbConnection as Connection).select({
//     from: 'Notes'
//   })

//   select<HTMLDivElement>('.note_list').innerHTML = ''
//   select<HTMLDivElement>('.nav_note_list').innerHTML = ''

//   results.forEach((note) => {
//     select<HTMLDivElement>('.note_list').append(
//       Note({ id: (note as IRetrievedNote).id, body: (note as IRetrievedNote).body })
//     )
//     select<HTMLDivElement>('.nav_note_list').append(
//       Note({ id: (note as IRetrievedNote).id, body: (note as IRetrievedNote).body })
//     )
//   })
// }
