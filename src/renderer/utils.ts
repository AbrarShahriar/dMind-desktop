import Note from './components/Note'
import { initialState } from './state'

export const createEl = (el: string): HTMLElement => document.createElement(el)
export function select<Type>(el: string): Type {
  return document.querySelector(el) as Type
}
export const selectAll = (el): NodeListOf<any> => document.querySelectorAll(el)

export const truncateText = (text: string, length: number) =>
  text.split(' ').slice(0, length).join(' ')
export const random = (min: number = 0, max: number = 10): number =>
  min + Math.floor(Math.random() * max)
export const generateId = (length: number = 8): string => {
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
  ]

  let id = ''
  for (let i = 0; i < length; i++) {
    let r = random(0, characters.length)
    id += characters[r]
  }

  return id
}

export const autoResizeTextarea = (e?: Event | any, dispatchFunc?: any): void => {
  const textarea = select<HTMLTextAreaElement>('.editor_input')
  var scrollTop = window.scrollY
  var scrollLeft = window.scrollX

  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
  textarea.scrollTop = textarea.scrollHeight
  if (e) {
    dispatchFunc()
  }

  window.scrollTo(scrollLeft, scrollTop)
}

export const updateSaveButton = () => {
  const saveBtn = select<HTMLButtonElement>('.btn_save')
  if (initialState.currentNoteSaved) {
    saveBtn.innerHTML = `<i class="btn_icon si-check"></i>`
    saveBtn.disabled = true
  } else {
    saveBtn.innerHTML = `<i class="btn_icon si-disk"></i>`
    saveBtn.disabled = false
  }
}

export const renderRetrievedNotes = async () => {
  select<HTMLDivElement>('.note_list').innerHTML = ''

  let results = await window.api.getNotes()

  results.forEach((note) => {
    select<HTMLDivElement>('.note_list').append(Note({ id: note.id, body: note.body }))
  })
}
