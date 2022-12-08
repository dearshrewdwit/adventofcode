const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day8/input.txt', 'utf8')
  const grid = data.trim().split("\n")
  const visibleTrees = []

  grid.forEach((row, rIndex) => {
    row.split('').forEach((tree, cIndex) => {
      const isTreeHidden = [
        isHidden(grid, tree, rIndex-1, cIndex, 'up')
        isHidden(grid, tree, rIndex+1, cIndex, 'down')
        isHidden(grid, tree, rIndex, cIndex-1, 'left')
        isHidden(grid, tree, rIndex, cIndex+1, 'right')
      ].every(Boolean)

      if (!isTreeHidden) visibleTrees.push(tree)
    })
  })

  return visibleTrees.length
}

const isHidden = (grid, tree, rIndex, cIndex, direction) => {
  if (grid[rIndex] === undefined || grid[rIndex][cIndex] === undefined) return false
  const compareTree = grid[rIndex][cIndex]
  if (compareTree >= tree) return true

  if (direction === 'up') {
    rIndex += -1
  } else if (direction === 'down') {
    rIndex += 1
  } else if (direction === 'left') {
    cIndex += -1
  } else if (direction === 'right') {
    cIndex += 1
  }

  return isHidden(grid, tree, rIndex, cIndex, direction)
}
