import { NextCoords } from './types'
const fs = require('fs/promises')

const nextCoords: NextCoords = {
  up: (rIndex, cIndex) => [rIndex - 1, cIndex],
  down: (rIndex, cIndex) => [rIndex + 1, cIndex],
  left: (rIndex, cIndex) => [rIndex, cIndex - 1],
  right: (rIndex, cIndex) => [rIndex, cIndex + 1]
}

export const main = async () => {
  const data: string = await fs.readFile('./day8/input.txt', 'utf8')
  const grid = data.trim().split('\n')
  const visibleTrees = []

  grid.forEach((row, rIndex) => {
    row.split('').forEach((tree, cIndex) => {
      const isTreeHidden = Object
        .keys(nextCoords)
        .map(direction => isHidden(grid, tree, direction, ...nextCoords[direction as keyof NextCoords](rIndex, cIndex)))
        .every(Boolean)

      if (!isTreeHidden) visibleTrees.push(tree)
    })
  })

  return visibleTrees.length
}

const isHidden = (grid: string[], tree: string, direction: string, rIndex: number, cIndex: number): Boolean => {
  if (!grid[rIndex] || !grid[rIndex][cIndex]) return false
  if (grid[rIndex][cIndex] >= tree) return true

  return isHidden(grid, tree, direction, ...nextCoords[direction as keyof NextCoords](rIndex, cIndex))
}
