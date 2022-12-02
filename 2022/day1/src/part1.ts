const fs = require('fs/promises')
const util = require('util')

export const main = async () => {
  const data: string = await fs.readFile('./day1/input.txt', 'utf8')

  const groupCals = data.trim().split("\n\n").map((group: string) => {
    const calories = group.split("\n").map(Number)
    return calories.reduce((a: number, b: number) => a + b, 0)
  })

  const sortedGroups = groupCals.sort((a: number, b: number) => a - b)
  return sortedGroups[sortedGroups.length-1]
}
