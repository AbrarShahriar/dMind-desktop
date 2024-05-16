import React from 'react'
import { Tooltip as JoyTooltip } from '@mui/joy'
import styles from './Tooltip.module.scss'

interface ITooltip {
  label: string
  children: JSX.Element
  hide?: boolean
  position?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
}

export default function Tooltip({ children, label, hide, position }: ITooltip) {
  return (
    <JoyTooltip
      arrow
      placement={position ? position : 'bottom'}
      enterDelay={500}
      size="sm"
      title={label}
      variant="soft"
      hidden={hide}
    >
      {children}
    </JoyTooltip>
  )
}
