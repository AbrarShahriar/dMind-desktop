export const truncateText = (text: string, length: number) =>
  text.split(' ').slice(0, length).join(' ')
