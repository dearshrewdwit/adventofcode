const fs = require('fs/promises')

const movePts = {
  'rock': 1,
  'paper': 2,
  'scissors': 3
}

const rules = {
  'rock': 'scissors',
  'paper': 'rock',
  'scissors': 'paper'
}

const dict = {
  'rock': ['A', 'X'],
  'paper': ['B', 'Y'],
  'scissors': ['C', 'Z']
}

const decryptMove = (moveEnc: string) => Object.keys(dict).find((move) => dict[move as keyof typeof dict].includes(moveEnc)) ?? ""

export const main = async () => {
  const data: string = await fs.readFile('./day2/data.txt', 'utf8')

  const matchPts = data.trim().split("\n").reduce((acc: number, val: string) => {
    let roundPts: number = 0
    const [oppMoveEnc, myMoveEnc] = val.split(" ")
    const myMove: string = decryptMove(myMoveEnc)
    const oppMove: string = decryptMove(oppMoveEnc)

    roundPts += movePts[myMove as keyof typeof movePts]

    if (myMove === oppMove) {
      roundPts += 3
    } else if (rules[myMove as keyof typeof rules] === oppMove) {
      roundPts += 6
    }

    return acc + roundPts
  }, 0)

  console.log(matchPts)
}

main()
