const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day8/input.txt', 'utf8')
  const grid = data.trim().split("\n")
  const scenicScores = []

  grid.forEach((row, rIndex) => {
    row.split('').forEach((tree, cIndex) => {
      const scenicScore = [
        findScore(grid, tree, 0, rIndex-1, cIndex, 'up'),
        findScore(grid, tree, 0, rIndex+1, cIndex, 'down'),
        findScore(grid, tree, 0, rIndex, cIndex-1, 'left'),
        findScore(grid, tree, 0, rIndex, cIndex+1, 'right')
      ].reduce((a, b) => a * b, 1)

      scenicScores.push(scenicScore)
    })
  })

  return scenicScores.sort((a,b) => a - b)[scenicScores.length-1]
}

const findScore = (grid, tree, score, rIndex, cIndex, direction) => {
  if (grid[rIndex] === undefined || grid[rIndex][cIndex] === undefined) return score
  const compareTree = grid[rIndex][cIndex]
  if (compareTree >= tree) return score+1

  if (direction === 'up') {
    rIndex += -1
  } else if (direction === 'down') {
    rIndex += 1
  } else if (direction === 'left') {
    cIndex += -1
  } else if (direction === 'right') {
    cIndex += 1
  }

  return findScore(grid, tree, score+1, rIndex, cIndex, direction)
}
