import { create } from 'zustand'

interface IStore {
  editorData: string
  currentNoteSaved: boolean
  refreshNotes: number
  currentNoteId: string
  previouslyCreatedNoteOpened: boolean
  tabIndex: number
}

interface IActions extends IStore {
  resetEditor: () => void
  setEditorData: (val: string) => void
  setCurrentNoteId: (val: string) => void
  setpreviouslyCreatedNoteOpened: (val: boolean) => void
  setCurrentNoteSaved: (val: boolean) => void
  updateRefreshNotes: () => void
  setTabIndex: (i: number) => void
}

// INITIAL STATE
const initialState: IStore = {
  editorData: '',
  refreshNotes: 0,
  currentNoteSaved: false,
  currentNoteId: '',
  previouslyCreatedNoteOpened: false,
  tabIndex: 0
}

// ACTIONS
const actions = (set: (state: IActions | Partial<IActions>) => void) => ({
  resetEditor: () => set({ editorData: '' }),
  setEditorData: (val) => set({ editorData: val }),
  setCurrentNoteId: (val) => set({ currentNoteId: val }),
  setCurrentNoteSaved: (val) => set({ currentNoteSaved: val }),
  setpreviouslyCreatedNoteOpened: (val) => set({ previouslyCreatedNoteOpened: val }),
  updateRefreshNotes: () =>
    set(((state) => ({ refreshNotes: state.refreshNotes + 1 })) as IActions | Partial<IActions>),
  setTabIndex: (index) => set({ tabIndex: index })
})

// STORE
export const useAppStore = create<IActions>((set) => ({
  ...initialState,
  ...actions(set)
}))
