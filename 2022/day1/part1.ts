const fs = require('fs')
const util = require('util')

fs.readFile('./day1/data.txt', 'utf8' , (err: any, data: string) => {
  if (err) {
    console.error(err)
    return
  }

  const groupCals = data.trim().split("\n\n").map((group: string) => {
    const calories = group.split("\n").map(Number)
    const totalCals = calories.reduce((a: number, b: number) => a + b, 0)
    return totalCals
  })

  const sortedGroups = groupCals.sort((a: number, b: number) => a - b)
  console.log(sortedGroups[sortedGroups.length-1])
})

export {};
