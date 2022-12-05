const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day5/input.txt', 'utf8')
  const [stackLines, moveLines] = data.split("\n\n").map(str => str.split("\n"))
  moveLines.pop()
  const keys = stackLines.pop().split("   ")

  const stacks = {}
  keys.forEach(key => stacks[key] = [])
  stackLines.reverse().forEach(line => {
    for (let i = 1; i < line.length; i+=4) {
      if (line[i] !== ' ') stacks[(i+3)/4].push(line[i])
    }
  })

  moveLines.forEach(line => {
    const [num, from, to] = line.match(/[0-9]+/g)
    moveCrates(stacks, num, from, to)
  })

  return keys.map(key => stacks[key][stacks[key].length-1]).join('')
}

const moveCrates = (stacks, num, from, to) => {
  const crates = stacks[from].splice(stacks[from].length-num, num)
  crates.reverse().forEach(crate => stacks[to].push(crate))
}
