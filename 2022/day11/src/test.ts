const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day11/test.txt', 'utf8')

  const monkeys = data.trim().split("\n\n").map((monkeyData: string, index) => {
    const lines = monkeyData.split('\n')

    return {
      items: lines[1].match(/[0-9]+/g).map(BigInt),
      inspectedItems: [],
      inspect: new Function('old', createFuncBody(lines[2].split(' = ')[1])),
      test: new Function('item', `return item % ${lines[3].match(/[0-9]+/g)[0]}n === 0n ? ${lines[4].match(/[0-9]+/g)[0]} : ${lines[5].match(/[0-9]+/g)[0]}`)
    }
  })

  let counter = 0
  while (counter < 100) {
    monkeys.forEach((monkey) => {
      takeTurn(monkey, monkeys)
    })
    counter++
  }
  console.log(monkeys)
  return monkeys
    .map(monkey => monkey.inspectedItems.length)
    .sort((a, b) => a - b)
    .slice(monkeys.length-2)
    .reduce((a, b) => a * b)
}

const takeTurn = (monkey, monkeys) => {
  while (monkey.items.length > 0) {
    let item = monkey.items.pop()
    item = monkey.inspect(item)
    monkey.inspectedItems.push(item)
    const nextMonkey = monkey.test(item)
    monkeys[nextMonkey].items.push(item)
  }
}

const createFuncBody = (str) => {
  const tokens = str.split(' ')
  if ((/[0-9]+/g).test(tokens[2])) {
    return `return ${tokens[0]} ${tokens[1]} ${tokens[2]}n`
  } else {
    return `return ${tokens[0]} ${tokens[1]} ${tokens[2]}`
  }
}
