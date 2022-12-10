import fs from 'fs/promises'
import { Operation, InstructionCycles, Program } from './types'

const instructionCycles: InstructionCycles = {
  noop: 1,
  addx: 2
}

export const main = async () => {
  const data = await fs.readFile('./day10/input.txt', 'utf8')
  const instructionSet: Operation[] = data.split('\n').map((line: string) => {
    const [command, val] = line.split(' ')
    return {
      name: command,
      target: 'x',
      val: Number(val),
      cycles: instructionCycles[command]
    }
  })

  return run(instructionSet)
}

const run = (instructionSet: Operation[]) => {
  const program: Program = { general: { x: 1, cycle: 0 }, ops: [] }
  const signalStrengths = []
  let instructionSetCounter = 0

  while (instructionSetCounter < instructionSet.length || program.ops.length !== 0) {
    program.general.cycle++

    if (program.ops.length === 0) {
      const op: Operation = instructionSet[instructionSetCounter]
      program.ops.push(op)
      instructionSetCounter++
    }

    if ([20, 60, 100, 140, 180, 220].includes(program.general.cycle)) {
      signalStrengths.push(program.general.x * program.general.cycle)
    }

    program.ops.forEach(op => {
      op.cycles--
      if (op.cycles === 0) {
        if (op.name !== 'noop') {
          program.general[op.target] += op.val
        }
      }
    })

    program.ops = program.ops.filter(op => op.cycles > 0)
  }

  return signalStrengths.reduce((a, b) => a + b)
}
