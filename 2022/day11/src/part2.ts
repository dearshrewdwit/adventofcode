import fs from 'fs/promises'
import { Monkey2 } from './types'

export const main = async () => {
  const data: string = await fs.readFile('./day11/input.txt', 'utf8')

  const monkeys: Monkey2[] = data.trim().split('\n\n').map((monkeyData: string) => {
    const lines = monkeyData.split('\n')

    return {
      items: (lines[1].match(/[0-9]+/g) ?? []).map(Number),
      inspectedItems: [],
      testNum: Number((lines[3].match(/[0-9]+/g) ?? [])[0]),
      inspect: new Function('old', `return ${lines[2].split(' = ')[1]}`), // eslint-disable-line no-new-func
      test: new Function('item', `return item % ${(lines[3].match(/[0-9]+/g) ?? [])[0]} === 0 ? ${(lines[4].match(/[0-9]+/g) ?? [])[0]} : ${(lines[5].match(/[0-9]+/g) ?? [])[0]}`) // eslint-disable-line no-new-func
    }
  })

  const productOfDivisors = monkeys.reduce((product, { testNum }) => product * testNum, 1)

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach(monkey => {
      while (monkey.items.length > 0) {
        const item = monkey.items.pop()
        const inspectedItem = monkey.inspect(item) % productOfDivisors
        monkey.inspectedItems.push(inspectedItem)
        const nextMonkey = monkey.test(inspectedItem)
        monkeys[nextMonkey].items.push(inspectedItem)
      }
    })
  }

  return monkeys
    .map(monkey => monkey.inspectedItems.length)
    .sort((a, b) => a - b)
    .slice(monkeys.length - 2)
    .reduce((a, b) => a * b)
}
