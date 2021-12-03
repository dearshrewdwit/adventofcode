const fs = require('fs')
const util = require('util')

fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const positions = {}

  data.trim().split("\n").forEach(line => {
    for (let i=0;i<line.length;i++) {
      if (positions[i] === undefined) positions[i] = []

      positions[i].push(line[i])
    }
  })

  const digits = Object.values(positions).map(position => position.sort()[Math.floor(position.length/2)])
  const inverted = digits.map(digit => (1-digit).toString()).join('')
  const bin = digits.join('')
  const binDec = parseInt(bin, 2)
  const invertedDec = parseInt(inverted, 2)

  console.log(binDec*invertedDec)
})
