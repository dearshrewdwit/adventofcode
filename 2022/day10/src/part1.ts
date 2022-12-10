const fs = require('fs/promises')
const instructionCycles = {
  'noop': 1,
  'addx': 2
}
const signalStrengths = []
const program = { x: 1, cycle: 0, ops: [] }
let instructionSetCounter = 0

export const main = async () => {
  const data: string = await fs.readFile('./day10/input.txt', 'utf8')

  const instructionSet = data.trim().split("\n").map((line: string) => {
    const [command, val] = line.split(' ')
    return {command: command, val: Number(val)}
  })
  run(instructionSet)
  return signalStrengths.reduce((a,b) => a +b)
}

const run = (instructionSet) => {
  while (instructionSetCounter < instructionSet.length || program.ops.length !== 0) {
    program.cycle++
    if (program.ops.length === 0) {
      const instruction = instructionSet[instructionSetCounter]
      const op = { name: instruction.command, target: 'x', val: instruction.val, cycles: instructionCycles[instruction.command] }
      program.ops.push(op)
      instructionSetCounter++
    }
    if ([20, 60, 100, 140, 180, 220].includes(program.cycle)) {
      signalStrengths.push(program.x * program.cycle)
    }
    program.ops.forEach(op => {
      op.cycles--
      if (op.cycles === 0) {
        if (op.name !== 'noop') {
          program[op.target] += op.val
        }
      }
    })

    program.ops = program.ops.filter(op => op.cycles > 0)
  }
}
