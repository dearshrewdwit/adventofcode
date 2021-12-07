const fs = require('fs')
const util = require('util')

fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const parsedLines = data.trim().split(",").map(line => Number(line))
  const median = parsedLines.sort()[Math.floor(parsedLines.length/2)]
  const fuel = findFuel(parsedLines, median, {})

  console.log(fuel)
})

function findFuel(positions, position, fuels) {
  if (fuels[position-1] > fuels[position] && fuels[position+1] > fuels[position]) return position
  fuels[position] = positions.map(num => Math.abs(num - position)).reduce((a, b) => a + b)
  let nextPosition
  if (fuels[position-1] === undefined && fuels[position+1] === undefined) {
    nextPosition = position+1
  } else if (fuels[position-1] === undefined && fuels[position] < fuels[position+1]) {
    nextPosition = position-1
  } else if (fuels[position+1] === undefined && fuels[position] < fuels[position-1]) {
    nextPosition = position+1
  } else if (fuels[position-1] === undefined && fuels[position] > fuels[position+1]) {
    nextPosition = position+1
  } else if (fuels[position+1] === undefined && fuels[position] > fuels[position-1]) {
    nextPosition = position-1
  }
  return findFuel(positions, nextPosition, fuels)
}
