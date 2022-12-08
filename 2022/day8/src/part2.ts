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
  const scenicScores: number[] = []

  grid.forEach((row, rIndex) => {
    row.split('').forEach((tree, cIndex) => {
      const scenicScore = Object
        .keys(nextCoords)
        .map(direction => findScore(grid, tree, 0, direction, ...nextCoords[direction as keyof NextCoords](rIndex, cIndex)))
        .reduce((a, b) => a * b, 1)

      scenicScores.push(scenicScore)
    })
  })

  return scenicScores.sort((a, b) => a - b)[scenicScores.length - 1]
}

const findScore = (grid: string[], tree: string, score: number, direction: string, rIndex: number, cIndex: number): number => {
  if (!grid[rIndex] || !grid[rIndex][cIndex]) return score
  if (grid[rIndex][cIndex] >= tree) return score + 1

  return findScore(grid, tree, score + 1, direction, ...nextCoords[direction as keyof NextCoords](rIndex, cIndex))
}
