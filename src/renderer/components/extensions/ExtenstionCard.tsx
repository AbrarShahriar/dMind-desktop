import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Link,
  Switch,
  Typography
} from '@mui/joy'
import { IExtensionCard } from '../../../types'
// import styles from './ExtensionCard.module.scss'
import { useEffect, useState } from 'react'
import { rules } from '../../parser/rules'

const cols = 3

export default function ExtenstionCard({ type, desc, extOn, title, url, topic }: IExtensionCard) {
  const [checked, setChecked] = useState(extOn)
  const [extensions, setExtensions] = useState<IExtensionCard[]>([])
  const [showRestartRequired, setShowRestartRequired] = useState(false)

  useEffect(() => {
    window.api.getPluginConfig().then((data) => setExtensions(data))
  }, [])

  const handleExtCheckedClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)

    let updatedExtensions = Array.from(extensions)

    updatedExtensions.forEach((ext) => {
      if (ext.type == type) {
        ext.extOn = event.target.checked
      }
    })
    rules.forEach((el) => {
      if (el.type == type) {
        el.disabled = !event.target.checked
      }
    })

    await window.api.udpatePluginConfig(updatedExtensions)
    setShowRestartRequired(true)
  }

  const handleRestartClick = async () => {
    return await window.api.relaunch()
  }

  return (
    <Card
      variant="soft"
      color="primary"
      sx={{ maxWidth: `calc(${Math.round(100 / cols)}% - 20px)` }}
    >
      <CardContent orientation="horizontal">
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            <Typography level="h3">{title}</Typography>
            <Chip variant="solid" color="primary" size="sm">
              {topic}
            </Chip>
          </Box>
          <Typography level="body-md">{desc}</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Link level="body-sm" href={url} target="_blank" sx={{ marginRight: 'auto' }}>
          Visit
        </Link>
        <Typography
          onClick={handleRestartClick}
          color="warning"
          level="body-sm"
          sx={{ display: showRestartRequired ? 'block' : 'none', cursor: 'pointer' }}
        >
          Restart
        </Typography>
        <Switch
          checked={checked}
          onChange={handleExtCheckedClick}
          size="lg"
          color={checked ? 'primary' : 'neutral'}
          variant={checked ? 'solid' : 'outlined'}
        />
      </CardActions>
    </Card>
  )
}
