import fs from 'node:fs/promises'
import path from 'node:path'

async function generatePaginationPages(total: number, pageSize: number) {
  const pageNum = Math.ceil(total / pageSize)
  const p = path.resolve('./')

  for (let i = 1; i <= pageNum; i++) {
    const content = `---
pagination: true
current: ${i}
title: articles_${i}
---
    `

    await fs.writeFile(`${p}/articles_${i}.md`, content, { encoding: 'utf-8' })
  }
}

export default generatePaginationPages
