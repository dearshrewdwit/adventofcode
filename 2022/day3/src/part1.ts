const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day3/input.txt', 'utf8')

  return data.trim().split("\n").reduce((acc, rucksack) => {
    const compartment1 = rucksack.substring(0, rucksack.length/2).split('')
    const compartment2 = rucksack.substring(rucksack.length/2, rucksack.length).split('')
    const sharedItem = compartment1.filter(item => compartment2.includes(item))[0]
    const priority = (/[a-z]/).test(sharedItem) ? sharedItem.charCodeAt(0) - 96 : sharedItem.charCodeAt(0) - 38

    return acc + priority
  }, 0)
}
