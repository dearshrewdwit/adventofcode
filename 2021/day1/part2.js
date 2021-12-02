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
  for (i=3; i<parsedLines.length; i++) {
    const windowPrevious = parsedLines[i-1] + parsedLines[i-2] + parsedLines[i-3]
    const windowCurrent = parsedLines[i] + parsedLines[i-1] + parsedLines[i-2]

    if (windowCurrent > windowPrevious) {
      count++
    }
  }
  console.log(count)
})
