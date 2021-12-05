const fs = require('fs')
const util = require('util')

fs.readFile('test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const parsedLines = data.trim().split("\n").map(line => line.split(" -> ").map(pair => pair.split(",").map(num => Number(num))))

  const coords = parsedLines.map(line => {
    const start = line[0]
    const end = line[1]
    const deltaX = start[0] - end[0]
    const deltaY = start[1] - end[1]
    if (deltaX  === 0 && deltaY !== 0) {
      return getCoords(start, end, deltaY, 1)
    } else if (deltaX !== 0 && deltaY === 0) {
      return getCoords(start, end, deltaX, 0)
    }
  })
  let count = 0
  const sortedCoords = coords.flat().sort().filter(coord => coord !== undefined)
  for (let i=1; i<sortedCoords.length; i++) {
    let prev = sortedCoords[i-1]
    let current = sortedCoords[i]
    if (prev[0] === current[0] && prev[1] === current[1]) count++
  }
  console.log(count)
})

function getCoords(start, end, delta, type) {
  let coord = start
  let coords = []
  coords.push([coord[0], coord[1]])
  while(coord[type] != end[type]) {
    if (delta > 0) coord[type]--
    if (delta < 0) coord[type]++
    coords.push([coord[0], coord[1]])
  }
  return coords
}
