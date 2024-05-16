import { MD_Types } from './node_types'

const headerIcon: string = 'bookmark'

export const ruleSets = [
  // HEADERS
  [
    {
      type: MD_Types.HEADER,
      regex: /^(#{6}\s)(.*)/gm,
      template: `<h6><i class="si-${headerIcon} header_icon"></i>$2</h6>`
    },
    {
      type: MD_Types.HEADER,
      regex: /^(#{5}\s)(.*)/gm,
      template: `<h5><i class="si-${headerIcon} header_icon"></i>$2</h5>`
    },
    {
      type: MD_Types.HEADER,
      regex: /^(#{4}\s)(.*)/gm,
      template: `<h4><i class="si-${headerIcon} header_icon"></i>$2</h4>`
    },
    {
      type: MD_Types.HEADER,
      regex: /^(#{3}\s)(.*)/gm,
      template: `<h3><i class="si-${headerIcon} header_icon"></i>$2</h3>`
    },
    {
      type: MD_Types.HEADER,
      regex: /^(#{2}\s)(.*)/gm,
      template: `<h2><i class="si-${headerIcon} header_icon"></i>$2</h2>`
    },
    {
      type: MD_Types.HEADER,
      regex: /^(#{1}\s)(.*)/gm,
      template: `<h1><i class="si-${headerIcon} header_icon"></i>$2</h1>`
    }
  ],

  // LINES
  [
    {
      type: MD_Types.GRAPHICS.LINE,
      regex: /^(\-\-\-)/gm,
      template: `<hr>`
    }
  ],

  // BLOCKS
  [
    // BLOCKQUOTE
    {
      type: MD_Types.BLOCK.QUOTE,
      regex: /^([\>]\s+.+\n?)+/gm,
      template: (blockquoteBody) => `<blockquote>${blockquoteBody}</blockquote>`
    },
    // CODEBLOCK
    {
      type: MD_Types.BLOCK.CODE,
      regex: /\`\`\`(\w+){0,}?(?:\n([\s\S]*?)\n)\`\`\`/gm,
      template: (lang, codeBody) => `<pre><code class="language-${lang}">${codeBody}</code></pre>`
    }
  ],

  // MATH
  [
    {
      type: MD_Types.MATH.DISPLAY_MODE,
      regex: /(?:\$\$)(?<! )(\S(.*?))(?! )(?:\$\$)/gm,
      template: (katexString) => `<span>${katexString}</span>`
    },
    {
      type: MD_Types.MATH.INLINE_MODE,
      regex: /(?:\$)(?<! )(\S(.*?))(?! )(?:\$)/gm,
      template: (katexString) => `<span>${katexString}</span>`
    }
  ],

  // TEXT FORMATTING
  [
    // BOLD
    {
      type: MD_Types.TEXT_FORMATTING.BOLD,
      regex: /(?:\*)(?<! )(\S(.*?))(?! )(?:\*)/gm,
      template: `<strong>$1</strong>`
    },
    // ITALIC
    {
      type: MD_Types.TEXT_FORMATTING.ITALIC,
      regex: /(?:\%)(?<! )(\S(.*?))(?! )(?:\%)/gm,
      template: `<em>$1</em>`
    },
    // STRIKETHROUGH
    {
      type: MD_Types.TEXT_FORMATTING.STRIKETHROUGH,
      regex: /(?:\~)(?<! )(\S(.*?))(?! )(?:\~)/gm,
      template: `<del>$1</del>`
    },
    // HIGHLIGHT
    {
      type: MD_Types.TEXT_FORMATTING.HIGHLIGHT,
      regex: /(?:\#)(?<! )(\S(.*?))(?! )(?:\#)/gm,
      template: `<mark>$1</mark>`
    },
    // UNDERLINE
    {
      type: MD_Types.TEXT_FORMATTING.UNDERLINE,
      regex: /(?:\_)(?<! )(\S(.*?))(?! )(?:\_)/gm,
      template: `<u>$1</u>`
    }
  ],

  // LISTS
  [
    // UNORDERED LIST
    {
      //   regex: /^(\*|\-)\s(\w.+)/gm,
      type: MD_Types.LIST.UL,
      regex: /^(?:[\*\-\+]\s+.+\n?)+/gm,
      template: (listBody) => '<ul>' + listBody + '</ul>'
    },

    // ORDERED LIST
    {
      type: MD_Types.LIST.OL,
      regex: /^(?:\d+\.\s+.+\n?)+/gm,
      template: (listBody) => '<ol>' + listBody + '</ol>'
    }
  ],

  // MEDIA
  [
    {
      type: MD_Types.MEDIA.IMAGE,
      regex: /(\!)(\[)+(.*)(\])(\()(.*)(\))/gm,
      template: `<img src="$6" alt="$3" />`
    },
    {
      type: MD_Types.MEDIA.CHECKBOX,
      regex: /\[([\s|x])\]/gm,
      template: (checked) => `<input type="checkbox" disabled ${checked && 'checked'} />`
    }
  ],

  // LINK
  [
    {
      type: MD_Types.LINK,
      regex: /(\[)+(.*)(\])(\()(.*)(\))/gm,
      template: `<a href="$5">$2</a>`
    }
  ],

  // INDENTATION
  [
    // {
    //   type: MD_Types.INDENTATION.TAB,
    //   regex: /^\_\_(.*)/gm,
    //   template: (level, body) =>
    //     `<div style="margin-left: ${level * 20}px">${body}</div>`,
    // },
    // {
    //   type: MD_Types.INDENTATION.LINE_BREAK,
    //   regex: /\n/gm,
    //   template: `<br>`,
    // },
  ]
]
