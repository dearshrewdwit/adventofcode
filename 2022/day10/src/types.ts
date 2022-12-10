interface InstructionCycles {
  [index: string]: number
}

interface Operation {
  name: string,
  target: string,
  val: number,
  cycles: number
}

interface Program {
  general: {
    [key: string]: number
    x: number
    cycle: number
  }

  ops: Operation[]
}

export {
  InstructionCycles,
  Operation,
  Program
}
