const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day11/input.txt', 'utf8')

  const monkeys = data.trim().split("\n\n").map((monkeyData: string, index) => {
    const lines = monkeyData.split('\n')

    return {
      items: lines[1].match(/[0-9]+/g).map(Number),
      inspectedItems: [],
      testNum: lines[3].match(/[0-9]+/g)[0],
      inspect: new Function('old', `return ${lines[2].split(' = ')[1]}`),
      test: new Function('item', `return item % ${lines[3].match(/[0-9]+/g)[0]} === 0 ? ${lines[4].match(/[0-9]+/g)[0]} : ${lines[5].match(/[0-9]+/g)[0]}`)
    }
  })

  const totalProduct = monkeys.reduce((product, {testNum}) => product * testNum, 1)

  for (let i=0; i<10000; i++) monkeys.forEach(monkey => takeTurn(monkey, monkeys, totalProduct))

  return monkeys
    .map(monkey => monkey.inspectedItems.length)
    .sort((a, b) => a - b)
    .slice(monkeys.length-2)
    .reduce((a, b) => a * b)
}

const takeTurn = (monkey, monkeys, totalProduct) => {
  while (monkey.items.length > 0) {
    let item = monkey.items.pop()
    item = monkey.inspect(item)
    item = item % totalProduct
    monkey.inspectedItems.push(item)
    const nextMonkey = monkey.test(item)
    monkeys[nextMonkey].items.push(item)
  }
}
