import { IExtensionCard } from '../../types'
import { MD_Types } from './node_types'
import { rules } from './rules'
import katex from 'katex'

export async function parseMd(md: string): Promise<string> {
  let html = md
  let pluginConfig: IExtensionCard[] = await window.api.getPluginConfig().then((data) => data)

  pluginConfig.forEach((plugin) => {
    rules.forEach((rule) => {
      if (plugin.type == 'math') {
        let i = rules.findIndex((r) => r.type == MD_Types.MATH.DISPLAY_MODE)
        let j = rules.findIndex((r) => r.type == MD_Types.MATH.INLINE_MODE)

        rules[i].disabled = !plugin.extOn
        rules[j].disabled = !plugin.extOn
      } else if (plugin.type == rule.type) {
        rule.disabled = !plugin.extOn
      }
    })
  })

  rules
    .filter((rule) => !rule.disabled)
    .forEach(({ regex, template, type }) => {
      if (typeof template === 'function') {
        switch (type) {
          case MD_Types.LIST.UL:
            const matchedULElements = html.match(regex) || []

            matchedULElements.forEach((match) => {
              let listBody = ``
              match
                .split('\n')
                .filter((el) => el.trim())
                .forEach((element) => {
                  listBody += `<li>${element.substring(2)}</li>`
                })

              html = html.replace(match, template(listBody, '') + '\n')
            })

            return

          case MD_Types.LIST.OL:
            const matchedOLElements = html.match(regex) || []

            matchedOLElements.forEach((match) => {
              let listBody = ``
              match
                .split('\n')
                .filter((el) => el)
                .forEach((element) => {
                  listBody += `<li>${element.substring(2)}</li>`
                })

              html = html.replace(match, template(listBody, ''))
            })
            return

          case MD_Types.BLOCK.QUOTE:
            const matchedBlockQuote = html.match(regex) || []
            matchedBlockQuote.forEach((match) => {
              let blockBody = ''
              match
                .split('>')
                .filter((el) => el)
                .forEach((element) => {
                  blockBody += `${element}`
                })

              html = html.replace(match, template(blockBody, ''))
            })
            return

          case MD_Types.BLOCK.CODE:
            const matchedCodeQuote = html.match(regex) || []
            matchedCodeQuote.forEach((match) => {
              let blockBody = ''
              const metadata = match.split('\n')

              const lang = metadata[0].substring(3).trim()

              metadata
                .filter((el, i) => !(i == 0 || i == match.split('\n').length - 1) && el)
                .forEach((el) => (blockBody += `${el}\r\n`))

              html = html.replace(match, template(lang, blockBody))
            })
            return

          case MD_Types.BLOCK.DIAGRAM:
            const matchedDiagramQuote = html.match(regex) || []
            matchedDiagramQuote.forEach((match) => {
              let diagramBody = ''
              const metadata = match.split('\n')

              metadata
                .filter((el, i) => !(i == 0 || i == match.split('\n').length - 1) && el)
                .forEach((el) => (diagramBody += `${el}\r\n`))

              html = html.replace(match, template(diagramBody, ''))
            })
            return

          case MD_Types.BLOCK.TABLE:
            const matchedTableQuote = html.match(regex) || []
            matchedTableQuote.forEach((match) => {
              let tableBody = ''
              const metadata = match.split('\n')

              metadata
                .filter((el, i) => !(i == 0 || i == match.split('\n').length - 1) && el)
                .forEach((el) => (tableBody += `${el}\r\n`))

              html = html.replace(match, template(tableBody, ''))
            })
            return

          case MD_Types.MEDIA.CHECKBOX:
            const matchedCheckboxes = html.match(regex) || []
            matchedCheckboxes.forEach((match) => {
              const checked = match.substring(1, 2).trim()

              html = html.replace(match, template(checked && checked, ''))
            })
            return

          case MD_Types.INDENTATION.TAB:
            const matchedTabElements = html.match(regex) || []

            matchedTabElements.forEach((match) => {
              const level = match.lastIndexOf('_') + 1

              html = html.replace(match, template(level, parseMd(match.substring(level))))
            })
            return

          case MD_Types.MATH.INLINE_MODE:
            const matchedInlineMath = html.match(regex) || []

            matchedInlineMath.forEach((match) => {
              html = html.replace(
                match,
                template(
                  katex.renderToString(match.split('$').filter((el) => el)[0], {
                    throwOnError: false
                  }),
                  ''
                )
              )
            })

          case MD_Types.MATH.DISPLAY_MODE:
            const matchedDisplayMath = html.match(regex) || []

            matchedDisplayMath.forEach((match) => {
              html = html.replace(
                match,
                template(
                  katex.renderToString(match.split('$$').filter((el) => el)[0], {
                    throwOnError: false,
                    displayMode: true
                  }),
                  ''
                )
              )
            })

          default:
            return
        }
      } else {
        html = html.replace(regex, template)
      }
    })

  html = html.replace('', '')

  return html
}
