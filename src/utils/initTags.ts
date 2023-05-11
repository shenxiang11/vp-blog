function initTags(posts: Post[]) {
  const record: Record<string, Post[]> = {}

  for (let i = 0; i < posts.length; i++) {
    const element = posts[i]
    const tags = element.frontmatter.tags as string[] | undefined

    if (tags && tags.length) {
      for (const tag of tags) {
        if (record[tag]) {
          record[tag].push(element)
        } else {
          record[tag] = [element]
        }
      }
    }
  }

  return record
}

export default initTags
