import { createContentLoader } from 'vitepress'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import generatePaginationPages from "./generatePaginationPages";

dayjs.extend(utc)
dayjs.extend(timezone)

declare const data: Post[]
export { data }
export default createContentLoader('docs/**/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    !(async function() {
      await generatePaginationPages(raw.length, 10)
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
  const date = dayjs.tz(raw, 'Asia/Shanghai')

  return {
    time: date.valueOf(),
    string: date.format('YYYY-MM-DD HH:mm:ss')
  }
}
