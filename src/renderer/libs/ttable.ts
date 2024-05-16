const localCreateEl = (el) => document.createElement(el)

const toHtml = (text) => {
  const textLineArr = text.split('\n').filter((el) => el)

  const table = localCreateEl('table')

  table.classList.add('ttable')

  textLineArr.forEach((line, lineNumber) => {
    const tr = localCreateEl('tr')

    const trData = line.split('|')

    if (lineNumber == 0) {
      trData.forEach((col) => {
        const th = localCreateEl('th')
        th.textContent = col.trim()
        tr.append(th)
      })
    } else {
      trData.forEach((col) => {
        const td = localCreateEl('td')
        td.textContent = col.trim()
        tr.append(td)
      })
    }

    table.append(tr)
  })

  return table.outerHTML
}

export const ttable = {
  toHtml
}
