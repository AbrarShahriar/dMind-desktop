import React from 'react'
import {
  Button,
  ColorPaletteProp,
  Snackbar as JoySnackbar,
  SnackbarPropsVariantOverrides,
  VariantProp
} from '@mui/joy'
import { Done } from '@mui/icons-material'

interface ISnackbar {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  variant?: VariantProp
  color?: ColorPaletteProp
  position?: {
    x: 'left' | 'right' | 'center'
    y: 'top' | 'bottom'
  }
  showCloseButton?: boolean
  icon?: JSX.Element
}

export default function Snackbar({
  icon,
  showCloseButton,
  position,
  title,
  open,
  setOpen,
  variant,
  color
}: ISnackbar) {
  return (
    <JoySnackbar
      variant={variant ? variant : 'soft'}
      color={color ? color : 'success'}
      open={open}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: position?.y ? position.y : 'bottom',
        horizontal: position?.x ? position.x : 'right'
      }}
      startDecorator={icon}
      endDecorator={
        showCloseButton && (
          <Button
            onClick={() => setOpen(false)}
            size="sm"
            variant={variant ? variant : 'soft'}
            color={color ? color : 'success'}
          >
            Dismiss
          </Button>
        )
      }
    >
      {title}
    </JoySnackbar>
  )
}
