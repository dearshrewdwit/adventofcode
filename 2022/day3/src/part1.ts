const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day3/input.txt', 'utf8')

  return data
    .trim()
    .split('\n')
    .reduce((acc, rucksack) => {
      const compartment1 = rucksack.slice(0, rucksack.length / 2)
      const compartment2 = rucksack.slice(rucksack.length / 2)
      const sharedItem = compartment1.split('').filter(item => compartment2.includes(item))[0]
      const offset = (/[a-z]/).test(sharedItem) ? 96 : 38

      return acc + sharedItem.charCodeAt(0) - offset
    }, 0)
}
