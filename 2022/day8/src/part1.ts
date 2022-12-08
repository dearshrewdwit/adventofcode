const fs = require('fs/promises')

const nextCoords = {
  'up': (rIndex, cIndex) => [rIndex-1, cIndex],
  'down': (rIndex, cIndex) => [rIndex+1, cIndex],
  'left': (rIndex, cIndex) => [rIndex, cIndex-1],
  'right': (rIndex, cIndex) => [rIndex, cIndex+1]
}

export const main = async () => {
  const data: string = await fs.readFile('./day8/input.txt', 'utf8')
  const grid = data.trim().split("\n")
  const visibleTrees = []

  grid.forEach((row, rIndex) => {
    row.split('').forEach((tree, cIndex) => {
      const isTreeHidden = Object
        .keys(nextCoords)
        .map(direction => isHidden(grid, tree, direction, ...nextCoords[direction](rIndex, cIndex)))
        .every(Boolean)

      if (!isTreeHidden) visibleTrees.push(tree)
    })
  })

  return visibleTrees.length
}

const isHidden = (grid, tree, direction, rIndex, cIndex) => {
  if (!grid[rIndex] || !grid[rIndex][cIndex]) return false
  if (grid[rIndex][cIndex] >= tree) return true

  const [rIndexNew, cIndexNew] = nextCoords[direction](rIndex, cIndex)

  return isHidden(grid, tree, direction, rIndexNew, cIndexNew)
}
