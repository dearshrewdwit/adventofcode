const fs = require('fs/promises')
const instructionCycles = {
  'noop': 1,
  'addx': 2
}

export const main = async () => {
  const data: string = await fs.readFile('./day10/input.txt', 'utf8')
  const instructionSet = data.trim().split("\n").map((line: string) => {
    const [command, val] = line.split(' ')
    return { name: command, target: 'x', val: Number(val), cycles: instructionCycles[command] }
  })

  return run(instructionSet)
}

const run = (instructionSet) => {
  const program = { x: 1, cycle: 0, ops: [] }
  const screen = [[]]
  let instructionSetCounter = 0

  while (instructionSetCounter < instructionSet.length || program.ops.length !== 0) {
    program.cycle++

    if (screen[screen.length-1].length === 40) screen.push([])
    const currentRow = screen[screen.length-1]

    if (program.ops.length === 0) {
      const op = instructionSet[instructionSetCounter]
      program.ops.push(op)
      instructionSetCounter++
    }

    if (Math.abs(program.x - (program.cycle-1)%40) <= 1) {
      currentRow.push('#')
    } else {
      currentRow.push('.')
    }

    program.ops.forEach(op => {
      op.cycles--
      if (op.cycles === 0 ) {
        if (op.name !== 'noop') {
          program[op.target] += op.val
        }
      }
    })

    program.ops = program.ops.filter(op => op.cycles > 0)
  }

  return screen.map(row => row.join(''))
}
