import fs from 'fs/promises'
import {
  movePts2,
  resultPts,
  movesForResult
} from "./data"

export const main = async () => {
  const data = await fs.readFile('./day2/data.txt', 'utf8')

  return data.trim().split("\n").reduce((acc: number, val: string) => {
    const [oppMove, result] = val.split(" ")
    const myMove: string = movesForResult[result](oppMove)
    const roundPts: number = movePts2[myMove] + resultPts[result]

    return acc + roundPts
  }, 0)
}
