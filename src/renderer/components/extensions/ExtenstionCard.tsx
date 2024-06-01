import { Box, Card, CardActions, CardContent, Chip, Link, Switch, Typography } from '@mui/joy'
import { IExtensionCard } from '../../../types'
// import styles from './ExtensionCard.module.scss'
import { useState } from 'react'

const cols = 3

export default function ExtenstionCard({
  desc,
  extOn,
  title,
  url,
  topic,
  topicIcon
}: IExtensionCard) {
  const [checked, setChecked] = useState(extOn)

  const handleExtCheckedClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
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
            <Chip variant="solid" color="primary" size="sm" startDecorator={topicIcon}>
              {topic}
            </Chip>
          </Box>
          <Typography level="body-md">{desc}</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Link href={url} target="_blank" sx={{ marginRight: 'auto' }}>
          Visit
        </Link>
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
