import { MD_Types, NOTE_RESPONSE_STATUS } from '../types'
import { resolvePath } from './path'
import jetpack from 'fs-jetpack'

const builtInPluignsDefaultConfig = [
  {
    type: MD_Types.BLOCK.DIAGRAM,
    title: 'Mermaid',
    desc: 'JavaScript based diagramming and charting tool.',
    url: 'https://mermaid.js.org/',
    extOn: true,
    topic: 'Diagram'
  },
  {
    type: 'math',
    title: 'KaTeX',
    desc: 'JavaScript library for TeX math rendering.',
    extOn: true,
    url: 'https://katex.org/',
    topic: 'Math'
  },
  {
    type: MD_Types.PLOT,
    title: 'Function-plot',
    desc: 'A 2d function plotter powered by D3.',
    extOn: true,
    url: 'https://mauriciopoppe.github.io/function-plot/',
    topic: 'Math'
  },
  {
    type: MD_Types.BLOCK.CODE,
    title: 'highlight.js',
    desc: 'JavaScript library for syntax highlighting.',
    extOn: true,
    url: 'https://highlightjs.com/',
    topic: 'Code'
  },
  {
    type: MD_Types.BLOCK.TABLE,
    title: 'TTable',
    desc: 'A home-grown library to convert text to beautiful tables.',
    extOn: true,
    url: 'n/a',
    topic: 'table'
  }
]

const setupPluginConfig = async (): Promise<void> => {
  try {
    const configPath = resolvePath('config/plugins.config.json')
    let configAlreadyExists = await jetpack.existsAsync(configPath)

    if (!configAlreadyExists) {
      await jetpack.writeAsync(configPath, builtInPluignsDefaultConfig)
      console.log('Default Plugin Config Created')
    }
    return
  } catch (error) {
    console.error(error)
    return
  }
}

const getPluginConfig = async () => {
  const configPath = resolvePath('/config/plugins.config.json')
  return (await jetpack.readAsync(configPath, 'json')) || []
}

const updatePluginConfig = async (updatedConfig) => {
  const configPath = resolvePath('/config/plugins.config.json')

  try {
    await jetpack.writeAsync(configPath, updatedConfig)
    return { status: NOTE_RESPONSE_STATUS.PLUGIN_CONFIG_UPDATED }
  } catch (error) {
    return { status: NOTE_RESPONSE_STATUS.UNKNOWN_ERROR, error }
  }
}

export const Config = { PluignConfig: { setupPluginConfig, getPluginConfig, updatePluginConfig } }
