const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day4/input.txt', 'utf8')

  return data
          .trim()
          .split("\n")
          .reduce((acc, pairsLine) => {
            const [pair1, pair2] = pairsLine.split(',').map(pairsStr => pairsStr.split('-').map(Number))
            const overlap = pair1[1] >= pair2[0] && pair2[1] >= pair1[0]
            return acc + Number(overlap)
          }, 0)
}
