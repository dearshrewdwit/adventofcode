const fs = require('fs')
const util = require('util')

fs.readFile('./data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const groupCals = data.trim().split("\n\n").map(group => {
    const calories = group.split("\n").map(Number)
    const totalCals = calories.reduce((a, b) => a + b, 0)
    return totalCals
  })

  const sortedGroups = groupCals.sort((a,b) => a - b)
  console.log(sortedGroups[sortedGroups.length-1])
})
