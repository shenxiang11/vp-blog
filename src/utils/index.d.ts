
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
