const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day3/input.txt', 'utf8')

  return data
          .split("\n")
          .reduce((acc, rucksack, index) => {
            acc.all.push(rucksack)
            if ((index + 1) % 3 === 0) acc.groups.push(acc.all.slice(-3))
            return acc
          }, { all: [], groups: [] })
          .groups
          .reduce((acc, group) => {
            const badge = group[0].split('').filter(item => group[1].includes(item) && group[2].includes(item))[0]
            const offset = (/[a-z]/).test(badge) ? 96 : 38
            return acc + badge.charCodeAt(0) - offset
          }, 0)
}
