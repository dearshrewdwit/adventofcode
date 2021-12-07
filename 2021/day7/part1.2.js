const fs = require('fs')
const util = require('util')

fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const positions = data.trim().split(",").map(line => Number(line))
  const median = positions.sort()[Math.floor(positions.length/2)]
  console.log(positions.map(num => Math.abs(num - median)).reduce((a, b) => a + b))
})
