const fs = require('fs')
const util = require('util')

fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const parsedLines = data.trim().split("\n").map(line => {
    const parts = line.split(' ')
    return [parts[0], Number(parts[1])]
  })

  let depth = 0
  let position = 0
  let aim = 0

  parsedLines.forEach(instruction => {
    if (instruction[0] === "forward") {
      position += instruction[1]
      depth += (aim * instruction[1])
    } else if (instruction[0] === "up") {
      aim -= instruction[1]
    } else if (instruction[0] === "down") {
      aim += instruction[1]
    }
  })
  console.log(depth*position)
})
