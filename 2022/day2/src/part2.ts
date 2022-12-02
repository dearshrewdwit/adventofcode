import fs from 'fs/promises'
import { Rules2, MovePts2, ResultPts, MovesForResult } from "./types"

const rules: Rules2 = {
  "A": "C",
  "B": "A",
  "C": "B"
}

const movePts: MovePts2 = {
  "A": 1,
  "B": 2,
  "C": 3
}

const resultPts: ResultPts = {
  "X": 0,
  "Y": 3,
  "Z": 6
}

const movesForResult: MovesForResult = {
  "X": (oppMove) => rules[oppMove as keyof Rules2],
  "Y": (oppMove) => oppMove,
  "Z": (oppMove) => Object.keys(rules).find((move) => rules[move as keyof Rules2] === oppMove) ?? ""
}

export const main = async () => {
  const data = await fs.readFile('./day2/input.txt', 'utf8')

  return data.split("\n").reduce((acc, val) => {
    const [oppMove, result] = val.split(" ")
    const myMove = movesForResult[result as keyof MovesForResult](oppMove)
    const roundPts = movePts[myMove as keyof MovePts2] + resultPts[result as keyof ResultPts]

    return acc + roundPts
  }, 0)
}
