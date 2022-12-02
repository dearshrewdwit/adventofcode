const fs = require('fs/promises')

const rules = {
  'rock': 'scissors',
  'paper': 'rock',
  'scissors': 'paper'
}

const dict = {
  'rock': ['A'],
  'paper': ['B'],
  'scissors': ['C']
}

const movePts = {
  'rock': 1,
  'paper': 2,
  'scissors': 3
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

const decryptMove = (moveEnc: string) => Object.keys(dict).find((move) => dict[move as keyof typeof dict].includes(moveEnc)) ?? ""

export const main = async () => {
  const data: string = await fs.readFile('./day2/data.txt', 'utf8')

  return data.trim().split("\n").reduce((acc: number, val: string) => {
    const [oppMoveEnc, resultEnc] = val.split(" ")
    const oppMove: string = decryptMove(oppMoveEnc)
    const myMove: string = movesForResult[resultEnc as keyof typeof movesForResult](oppMove)
    const roundPts = movePts[myMove as keyof typeof movePts] + resultPts[resultEnc as keyof typeof resultPts]

    return acc + roundPts
  }, 0)
}
