const fs = require('fs')
const util = require('util')

fs.readFile('data1.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const parsedLines = data.trim().split("\n").map(line => {
    return line
  }

  console.log()
})
