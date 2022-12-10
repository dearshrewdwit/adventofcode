import fs from 'fs/promises'
import { Operation, InstructionCycles, Program } from './types'

const instructionCycles: InstructionCycles = {
  noop: 1,
  addx: 2
}

export const main = async () => {
  const data = await fs.readFile('./day10/input.txt', 'utf8')
  const instructionSet: Operation[] = data.trim().split('\n').map((line: string) => {
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
  const screen: string[][] = [[]]
  let instructionSetCounter = 0

  while (instructionSetCounter < instructionSet.length || program.ops.length !== 0) {
    program.general.cycle++

    if (screen[screen.length - 1].length === 40) screen.push([])
    const currentRow: string[] = screen[screen.length - 1]

    if (program.ops.length === 0) {
      const op: Operation = instructionSet[instructionSetCounter]
      program.ops.push(op)
      instructionSetCounter++
    }

    const rowPosition = (program.general.cycle - 1) % 40
    const spriteIsVisible = Math.abs(program.general.x - rowPosition) <= 1
    currentRow.push(spriteIsVisible ? '#' : '.')

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

  return screen.map(row => row.join('')).join('\n')
}
