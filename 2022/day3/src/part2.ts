const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day3/input.txt', 'utf8')

  return data
          .split("\n")
          .reduce((acc: { all: string[], sumPriority: number }, rucksack, index) => {
            acc.all.push(rucksack)
            if ((index + 1) % 3 === 0) {
              const group = acc.all.slice(-3)
              const badge = group[0].split('').filter(item => group[1].includes(item) && group[2].includes(item))[0]
              const offset = (/[a-z]/).test(badge) ? 96 : 38
              acc.sumPriority += badge.charCodeAt(0) - offset
            }
            return acc
          }, { all: [], sumPriority: 0 }).sumPriority
}
