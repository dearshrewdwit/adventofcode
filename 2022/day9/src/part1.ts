const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day9/input.txt', 'utf8')
  const rope = data
    .trim()
    .split("\n")
    .reduce((rope, line) => {
      const [direction, moves] = line.split(' ')
      moveHead(rope, direction, 0, moves)

      return rope
    }, { headPath: [[0,0]], tailPath: [[0,0]] })

  return (new Set(rope.tailPath.map(tail => tail.join(',')))).size
}

const moveHead = (rope, direction, counter, numMoves) => {
  if (counter >= numMoves) return

  const currentHead = rope.headPath[rope.headPath.length-1]

  if (direction === 'R') {
    rope.headPath.push([currentHead[0]+1, currentHead[1]])
  } else if (direction === 'D') {
    rope.headPath.push([currentHead[0], currentHead[1]-1])
  } else if (direction === 'L') {
    rope.headPath.push([currentHead[0]-1, currentHead[1]])
  } else if (direction === 'U') {
    rope.headPath.push([currentHead[0], currentHead[1]+1])
  }

  const tail = nextTail(rope, direction)
  if (tail) rope.tailPath.push(tail)

  return moveHead(rope, direction, counter+1, numMoves)
}

const nextTail = (rope, direction) => {
  const head = rope.headPath[rope.headPath.length-1]
  const tail = rope.tailPath[rope.tailPath.length-1]

  let newTail
  if (headIsAdjacent(head, tail)) return
  if (head[0] === tail[0]) {
    if (direction === 'U') {
      newTail = [tail[0], tail[1]+1]
    } else if (direction === 'D') {
      newTail = [tail[0], tail[1]-1]
    }
  } else if (head[1] === tail[1]) {
    if (direction === 'L') {
      newTail = [tail[0]-1, tail[1]]
    } else if (direction === 'R') {
      newTail = [tail[0]+1, tail[1]]
    }
  } else if (direction === 'U'){
    newTail = [head[0], tail[1]+1]
  } else if (direction === 'D'){
    newTail = [head[0], tail[1]-1]
  } else if (direction === 'L'){
    newTail = [tail[0]-1, head[1]]
  } else if (direction === 'R'){
    newTail = [tail[0]+1, head[1]]
  }

  return newTail
}

const headIsAdjacent = (head, tail) => tail.every((coord, index) => Math.abs(coord - head[index]) <= 1)
