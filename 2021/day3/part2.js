const fs = require('fs')
const util = require('util')

fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const numbers = data.trim().split("\n")

  const oxygenRating = parseInt(find(numbers, 0, false), 2)
  const co2Rating = parseInt(find(numbers, 0, true), 2)

  console.log(oxygenRating*co2Rating)
})

function find(numbers, position, inverted) {

  if (numbers.length <= 1) {
    return numbers[0]
  }

  const positions = numbers.map(number => number[position])
  const bit = calcBit(positions, inverted)
  const filtered = numbers.filter(number => number[position] === bit)

  return find(filtered, position+1, inverted)
}

function calcBit(positions, inverted) {
  if (inverted) positions = positions.reverse()
  let bit = positions.sort()[Math.floor(positions.length/2)]
  if (inverted) bit = (1-bit).toString()

  return bit
}
