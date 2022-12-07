import fs from 'fs/promises'
import { Rules, MovePts, Dict } from './types'

const rules: Rules = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
}
const dict: Dict = {
  rock: ['A', 'X'],
  paper: ['B', 'Y'],
  scissors: ['C', 'Z']
}

const movePts: MovePts = {
  rock: 1,
  paper: 2,
  scissors: 3
}

const decryptMove = (moveEnc: string) => Object.keys(dict).find((move) => dict[move as keyof Dict].includes(moveEnc)) ?? ''

export const main = async () => {
  const data = await fs.readFile('./day2/input.txt', 'utf8')

  return data.split('\n').reduce((acc, val) => {
    let roundPts = 0
    const [oppMove, myMove] = val.split(' ').map(decryptMove)
    roundPts += movePts[myMove as keyof MovePts]

    if (myMove === oppMove) {
      roundPts += 3
    } else if (rules[myMove as keyof Rules] === oppMove) {
      roundPts += 6
    }

    return acc + roundPts
  }, 0)
}
