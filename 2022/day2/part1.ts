import fs  from 'fs/promises'
import {
  rules,
  movePts,
  dict,
} from "./data"

const decryptMove = (moveEnc: string) => Object.keys(dict).find((move) => dict[move].includes(moveEnc)) ?? ""

export const main = async () => {
  const data: string = await fs.readFile('./day2/input.txt', 'utf8')

  return data.trim().split("\n").reduce((acc: number, val: string) => {
    let roundPts: number = 0
    const [oppMove, myMove] = val.split(" ").map(decryptMove)
    roundPts += movePts[myMove]

    if (myMove === oppMove) {
      roundPts += 3
    } else if (rules[myMove] === oppMove) {
      roundPts += 6
    }

    return acc + roundPts
  }, 0)
}
