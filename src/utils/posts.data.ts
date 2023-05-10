import { createContentLoader } from 'vitepress'
import dayjs from 'dayjs'
import generatePaginationPages from "./generatePaginationPages";

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
    !(async function() {
      await generatePaginationPages(raw.length, 8)
    })()
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
  const date = dayjs(raw)
  return {
    time: date.valueOf(),
    string: date.format('YYYY-MM-DD HH:mm:ss')
  }
}
