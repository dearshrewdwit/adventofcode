const fs = require('fs/promises')

const rules = {
  'A': 'C',
  'B': 'A',
  'C': 'B'
}

const movePts = {
  'A': 1,
  'B': 2,
  'C': 3
}

const resultPts = {
  'X': 0,
  'Y': 3,
  'Z': 6
}

const movesForResult = {
  'X': (oppMove: string) => rules[oppMove as keyof typeof rules],
  'Y': (oppMove: string) => oppMove,
  'Z': (oppMove: string) => Object.keys(rules).find((move) => rules[move as keyof typeof rules] === oppMove) ?? ""
}

export const main = async () => {
  const data: string = await fs.readFile('./day2/data.txt', 'utf8')

  return data.trim().split("\n").reduce((acc: number, val: string) => {
    const [oppMove, result] = val.split(" ")
    const myMove: string = movesForResult[result as keyof typeof movesForResult](oppMove)
    const roundPts = movePts[myMove as keyof typeof movePts] + resultPts[result as keyof typeof resultPts]

    return acc + roundPts
  }, 0)
}
