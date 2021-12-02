const fs = require('fs')
const util = require('util')

fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const parsedLines = data.trim().split("\n").map(line => {
    return Number(line)
  })

  let count = 0
  for (i=1; i<parsedLines.length; i++) {
    if (parsedLines[i] > parsedLines[i-1]) {
      count++
    }
  }
  console.log(count)
})
