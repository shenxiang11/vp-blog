import { createContentLoader } from 'vitepress'
import dayjs from 'dayjs'

interface Post {
  title: string
  url: string
  description: string | null
  date: {
    time: number
    string: string
  }
  cover: {
    image: string
    position: 'left' | 'right'
  } | null
  excerpt: string | undefined
  frontmatter: Record<string, any>
}

declare const data: Post[]
export { data }
export default createContentLoader('docs/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return (
      raw
        .map(({ url, frontmatter, excerpt }) => ({
          title: frontmatter.title,
          description: frontmatter.description,
          cover: frontmatter.cover,
          url,
          excerpt,
          date: formatDate(frontmatter.date),
          frontmatter,
        }))
        .sort((a, b) => b.date.time - a.date.time)
    )
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: dayjs(raw).format('YYYY-MM-DD')
  }
}
