import { Stacks } from './types'
const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day5/input.txt', 'utf8')
  const [stackLines, moveLines]: string[][] = data.split('\n\n').map(str => str.split('\n'))

  const stacks: Stacks = {}
  const keys: string[] = (stackLines.pop() || '').split('   ')
  keys.forEach(key => { stacks[key] = [] })
  stackLines.reverse().forEach(line => {
    for (let i = 1; i < line.length; i += 4) {
      if (line[i] !== ' ') stacks[(i + 3) / 4].push(line[i])
    }
  })

  moveLines.forEach(line => {
    const match = line.match(/[0-9]+/g)
    if (match) {
      const [num, from, to] = match.map(Number)
      stacks[to].push(...stacks[from].splice(stacks[from].length - num, num).reverse())
    }
  })

  return keys.map(key => stacks[key][stacks[key].length - 1]).join('')
}
