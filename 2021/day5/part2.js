const fs = require('fs')
const util = require('util')

fs.readFile('data.txt', 'utf8' , (err, data) => {
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

    return getCoords(start, end, deltaX, deltaY)
  })
  let counts = {}
  coords.flat().forEach(item => counts[item] = (counts[item] || 0) + 1)
  console.log(Object.values(counts).filter(occurrences => occurrences >= 2).length)
})

function getCoords(start, end, deltaX, deltaY) {
  let coord = start
  let coords = []
  coords.push([coord[0], coord[1]])
  while(coord[0] !== end[0] || coord[1] !== end[1]) {
    if (deltaX > 0) coord[0]--
    if (deltaY > 0) coord[1]--
    if (deltaX < 0) coord[0]++
    if (deltaY < 0) coord[1]++
    coords.push([coord[0], coord[1]])
  }
  return coords
}
