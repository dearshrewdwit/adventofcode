interface Monkey1 {
  items: number[],
  inspectedItems: number[],
  inspect: Function,
  test: Function
}

interface Monkey2 {
  items: number[],
  inspectedItems: number[],
  testNum: number,
  inspect: Function,
  test: Function
}

export {
  Monkey1,
  Monkey2
}
