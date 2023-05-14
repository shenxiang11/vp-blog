const path = require('path')
const fs = require('node:fs/promises')
const dayjs = require("dayjs");

!(async function() {
  const dir = path.resolve(__dirname, process.argv[2])
  const filename = process.argv[3] + '.md'

  await fs.writeFile(`${dir}/${filename}`, `---
title: ${process.argv[3]}
date: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}+8
tags: []
layout: post
cover:
  image: ***
---

  `)
})()





