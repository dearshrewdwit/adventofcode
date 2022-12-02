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
  "X": (oppMove: string): string => rules[oppMove as keyof Rules2],
  "Y": (oppMove: string): string => oppMove,
  "Z": (oppMove: string): string => Object.keys(rules).find((move) => rules[move as keyof Rules2] === oppMove) ?? ""
}

export const main = async () => {
  const data = await fs.readFile('./day2/input.txt', 'utf8')

  return data.trim().split("\n").reduce((acc: number, val: string) => {
    const [oppMove, result] = val.split(" ")
    const myMove: string = movesForResult[result as keyof MovesForResult](oppMove)
    const roundPts: number = movePts[myMove as keyof MovePts2] + resultPts[result as keyof ResultPts]

    return acc + roundPts
  }, 0)
}
