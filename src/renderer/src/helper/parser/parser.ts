import { ttable } from '../../libs/ttable.js'
import { MD_Types } from './node_types'
import { ruleSets } from './rules'

export function parseMd(md: string): string {
  let html = md

  ruleSets.forEach((ruleSet) => {
    ruleSet.forEach(({ regex, template, type }) => {
      if (typeof template === 'function') {
        switch (type) {
          case MD_Types.LIST.UL:
            let matchedULElements = html.match(regex) || []

            matchedULElements.forEach((match) => {
              let listBody = ``
              match
                .split('\n')
                .filter((el) => el.trim())
                .forEach((element) => {
                  listBody += `<li>${element.substring(2)}</li>`
                })

              html = html.replace(match, template(listBody) + '\n')
            })

            return

          case MD_Types.LIST.OL:
            let matchedOLElements = html.match(regex) || []

            matchedOLElements.forEach((match) => {
              let listBody = ``
              match
                .split('\n')
                .filter((el) => el)
                .forEach((element) => {
                  listBody += `<li>${element.substring(2)}</li>`
                })

              html = html.replace(match, template(listBody))
            })
            return

          case MD_Types.BLOCK.QUOTE:
            let matchedBlockQuote = html.match(regex) || []
            matchedBlockQuote.forEach((match) => {
              let blockBody = ''
              match
                .split('>')
                .filter((el) => el)
                .forEach((element) => {
                  blockBody += `${element}`
                })

              html = html.replace(match, template(blockBody))
            })
            return

          case MD_Types.BLOCK.CODE:
            let matchedCodeQuote = html.match(regex) || []
            matchedCodeQuote.forEach((match) => {
              let blockBody = ''
              let metadata = match.split('\n')

              let lang = metadata[0].substring(3).trim()

              metadata
                .filter((el, i) => !(i == 0 || i == match.split('\n').length - 1) && el)
                .forEach((el) => (blockBody += `${el}\r\n`))

              if (lang === 'diagram') {
                html = html.replace(match, `<pre class="diagram mermaid">${blockBody}</pre>`)
                return
              } else if (lang === 'table') {
                html = html.replace(match, ttable.toHtml(blockBody))
                return
              }
              html = html.replace(match, template(lang, blockBody))
            })
            return

          case MD_Types.MEDIA.CHECKBOX:
            let matchedCheckboxes = html.match(regex) || []
            matchedCheckboxes.forEach((match) => {
              let checked = match.substring(1, 2).trim()

              html = html.replace(match, template(checked && checked))
            })
            return

          case MD_Types.INDENTATION.TAB:
            const matchedTabElements = html.match(regex) || []

            matchedTabElements.forEach((match) => {
              let level = match.lastIndexOf('_') + 1

              console.log(html)

              html = html.replace(match, template(level, parseMd(match.substring(level))))
            })
            return

          default:
            return
        }
      } else {
        html = html.replace(regex, template)
      }
    })
  })

  html = html.replace('', '')
  return html
}
