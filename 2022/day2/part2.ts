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
  'rock': ['A'],
  'paper': ['B'],
  'scissors': ['C']
}

const decryptMove = (moveEnc: string) => Object.keys(dict).find((move) => dict[move as keyof typeof dict].includes(moveEnc)) ?? ""

export const main = async () => {
  const data: string = await fs.readFile('./day2/data.txt', 'utf8')

  const matchPts = data.trim().split("\n").reduce((acc: number, val: string) => {
    let roundPts: number = 0
    const [oppMoveEnc, resultEnc] = val.split(" ")
    const oppMove: string = decryptMove(oppMoveEnc)
    let myMove: string

    if (resultEnc === 'Y') {
      myMove = oppMove
      roundPts += 3
    } else if (resultEnc === 'Z') {
      myMove = Object.keys(rules).find((move) => rules[move as keyof typeof rules] === oppMove) ?? ""
      roundPts += 6
    } else {
      myMove = rules[oppMove as keyof typeof rules]
    }

    roundPts += movePts[myMove as keyof typeof movePts]

    return acc + roundPts
  }, 0)

  console.log(matchPts)
}

main()
