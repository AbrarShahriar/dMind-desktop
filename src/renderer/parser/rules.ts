import { ttable } from '../libs/ttable'
import { IRule } from '../../types'
import { MD_Types } from './node_types'

export const rules: IRule[] = [
  // HEADERS

  {
    type: MD_Types.HEADER,
    regex: /^(#{6}\s)(.*)/gm,
    template: `<h6>$2</h6>`,
    disabled: false
  },
  {
    type: MD_Types.HEADER,
    regex: /^(#{5}\s)(.*)/gm,
    template: `<h5>$2</h5>`,
    disabled: false
  },
  {
    type: MD_Types.HEADER,
    regex: /^(#{4}\s)(.*)/gm,
    template: `<h4>$2</h4>`,
    disabled: false
  },
  {
    type: MD_Types.HEADER,
    regex: /^(#{3}\s)(.*)/gm,
    template: `<h3>$2</h3>`,
    disabled: false
  },
  {
    type: MD_Types.HEADER,
    regex: /^(#{2}\s)(.*)/gm,
    template: `<h2>$2</h2>`,
    disabled: false
  },
  {
    type: MD_Types.HEADER,
    regex: /^(#{1}\s)(.*)/gm,
    template: `<h1>$2</h1>`,
    disabled: false
  },

  // LINES

  {
    type: MD_Types.GRAPHICS.LINE,
    regex: /^(\-\-\-)/gm,
    template: `<hr>`,
    disabled: false
  },

  // BLOCKS

  // DIAGRAM
  {
    type: MD_Types.BLOCK.DIAGRAM,
    regex: /\`\`\`diagram(\w+){0,}?(?:\n([\s\S]*?)\n)\`\`\`/gm,
    template: (diagramBody) => `<pre class="diagram mermaid">${diagramBody}</pre>`,
    disabled: true
  },
  // TABLE
  {
    type: MD_Types.BLOCK.TABLE,
    regex: /\`\`\`table(\w+){0,}?(?:\n([\s\S]*?)\n)\`\`\`/gm,
    template: (tableBody) => ttable.toHtml(tableBody),
    disabled: false
  },
  // BLOCKQUOTE
  {
    type: MD_Types.BLOCK.QUOTE,
    regex: /^([\>]\s+.+\n?)+/gm,
    template: (blockquoteBody) => `<blockquote>${blockquoteBody}</blockquote>`,
    disabled: false
  },
  // CODEBLOCK
  {
    type: MD_Types.BLOCK.CODE,
    regex: /\`\`\`(\w+){0,}?(?:\n([\s\S]*?)\n)\`\`\`/gm,
    template: (lang, codeBody) => `<pre><code class="language-${lang}">${codeBody}</code></pre>`,
    disabled: false
  },

  // MATH

  {
    type: MD_Types.MATH.DISPLAY_MODE,
    regex: /(?:\$\$)(?<! )(\S(.*?))(?! )(?:\$\$)/gm,
    template: (katexString) => `<span>${katexString}</span>`,
    disabled: false
  },
  {
    type: MD_Types.MATH.INLINE_MODE,
    regex: /(?:\$)(?<! )(\S(.*?))(?! )(?:\$)/gm,
    template: (katexString) => `<span>${katexString}</span>`,
    disabled: false
  },

  // TEXT FORMATTING

  // BOLD
  {
    type: MD_Types.TEXT_FORMATTING.BOLD,
    regex: /(?:\*)(?<! )(\S(.*?))(?! )(?:\*)/gm,
    template: `<strong>$1</strong>`,
    disabled: false
  },
  // ITALIC
  {
    type: MD_Types.TEXT_FORMATTING.ITALIC,
    regex: /(?:\%)(?<! )(\S(.*?))(?! )(?:\%)/gm,
    template: `<em>$1</em>`,
    disabled: false
  },
  // STRIKETHROUGH
  {
    type: MD_Types.TEXT_FORMATTING.STRIKETHROUGH,
    regex: /(?:\~)(?<! )(\S(.*?))(?! )(?:\~)/gm,
    template: `<del>$1</del>`,
    disabled: false
  },
  // HIGHLIGHT
  {
    type: MD_Types.TEXT_FORMATTING.HIGHLIGHT,
    regex: /(?:\#)(?<! )(\S(.*?))(?! )(?:\#)/gm,
    template: `<mark>$1</mark>`,
    disabled: false
  },
  // UNDERLINE
  {
    type: MD_Types.TEXT_FORMATTING.UNDERLINE,
    regex: /(?:\_)(?<! )(\S(.*?))(?! )(?:\_)/gm,
    template: `<u>$1</u>`,
    disabled: false
  },
  // INLINE_CODE
  {
    type: MD_Types.TEXT_FORMATTING.INLINE_CODE,
    regex: /(?:\`)(?<! )(\S(.*?))(?! )(?:\`)/gm,
    template: `<code class='inline_code'>$1</code>`,
    disabled: false
  },
  // UNDERLINE
  {
    type: MD_Types.TEXT_FORMATTING.UNDERLINE,
    regex: /(?:\_)(?<! )(\S(.*?))(?! )(?:\_)/gm,
    template: `<u>$1</u>`,
    disabled: false
  },

  // LISTS

  // UNORDERED LIST
  {
    type: MD_Types.LIST.UL,
    regex: /^(?:[\*\-\+]\s+.+\n?)+/gm,
    template: (listBody) => '<ul>' + listBody + '</ul>',
    disabled: false
  },

  // ORDERED LIST
  {
    type: MD_Types.LIST.OL,
    regex: /^(?:\d+\.\s+.+\n?)+/gm,
    template: (listBody) => '<ol>' + listBody + '</ol>',
    disabled: false
  },

  // MEDIA

  {
    type: MD_Types.MEDIA.IMAGE,
    regex: /(\!)(\[)+(.*)(\])(\()(.*)(\))/gm,
    template: `<img src="$6" alt="$3" />`,
    disabled: false
  },
  {
    type: MD_Types.MEDIA.CHECKBOX,
    regex: /\[([\s|x])\]/gm,
    template: (checked) => `<input type="checkbox" disabled ${checked && 'checked'} />`,
    disabled: false
  },

  // LINK

  {
    type: MD_Types.LINK,
    regex: /(\[)+(.*)(\])(\()(.*)(\))/gm,
    template: `<a href="$5">$2</a>`,
    disabled: false
  }
]
