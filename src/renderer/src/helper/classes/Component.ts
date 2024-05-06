import { ComponentInputs } from '../../types/types'
import { createEl } from '../utils'

enum ListenerTypesForComponent {
  Click = 'click',
  Input = 'input',
  Change = 'change'
}

export default class Component {
  public static ListenerTypes = ListenerTypesForComponent

  private createdEl: HTMLElement

  constructor({
    el,
    classList,
    text = '',
    _html = '',
    modifier = {},
    styles = {},
    dataset = {}
  }: ComponentInputs) {
    this.createdEl = createEl(el)

    if (classList) {
      this.createdEl.classList.add(...classList)
    }

    if (text) {
      this.createdEl.innerText = text
    }

    if (_html) {
      this.createdEl.innerHTML = _html
    }

    if (modifier) {
      for (const key in modifier) {
        this.createdEl[key] = modifier[key]
      }
    }

    if (styles) {
      for (const key in styles) {
        this.createdEl.style[key] = styles[key]
      }
    }

    if (dataset) {
      for (const key in dataset) {
        this.createdEl.setAttribute(`data-${key}`, dataset[key])
      }
    }
  }

  public addChildren(children: Component[] | HTMLElement[]) {
    if (this.createdEl)
      children.forEach((child: Component | HTMLElement) => {
        if ((child as Component).getDomNode) {
          return this.createdEl && this.createdEl.append((child as Component).getDomNode())
        }
        return this && this.createdEl.append(child as HTMLElement)
      })
  }

  public addChild(child: Component | HTMLElement) {
    if ((child as Component).getDomNode) {
      this.createdEl.append((child as Component).getDomNode())
    } else {
      this.createdEl.append(child as HTMLElement)
    }
  }

  public addListener(listenerType: ListenerTypesForComponent, callback) {
    this.createdEl.addEventListener(listenerType as any, callback)
  }

  public getDomNode(): HTMLElement {
    return this.createdEl
  }

  public setText(text: string) {
    this.createdEl.innerText = text
  }

  public _setHTML(html: string) {
    this.createdEl.innerHTML = html
  }
}
