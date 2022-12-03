const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day3/input.txt', 'utf8')

  return data
          .split("\n")
          .reduce((acc, rucksack, index) => {
            acc.currentGroup.push(rucksack)
            if ((index + 1) % 3 === 0) {
              acc.groups.push([...acc.currentGroup])
              acc.currentGroup = []
            }
            return acc
          }, { currentGroup: [], groups: [] })
          .groups
          .reduce((acc, group) => {
            const badge = group[0].split('').filter(item => group[1].includes(item) && group[2].includes(item))[0]
            const priority = (/[a-z]/).test(badge) ? badge.charCodeAt(0) - 96 : badge.charCodeAt(0) - 38

            return acc + priority
          }, 0)
}
