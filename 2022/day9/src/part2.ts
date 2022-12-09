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
    }, [
      [[0,0]],
      [[0,0]],
      [[0,0]],
      [[0,0]],
      [[0,0]],
      [[0,0]],
      [[0,0]],
      [[0,0]],
      [[0,0]],
      [[0,0]]
    ])

  const tailPath = rope[rope.length-1]
  console.log(rope)
  return (new Set(tailPath.map(tail => tail.join(',')))).size
}

const moveHead = (rope, direction, counter, numMoves) => {
  if (counter >= numMoves) return

  const headPath = rope[0]
  const currentHead = headPath[headPath.length-1]

  if (direction === 'R') {
    headPath.push([currentHead[0]+1, currentHead[1]])
  } else if (direction === 'D') {
    headPath.push([currentHead[0], currentHead[1]-1])
  } else if (direction === 'L') {
    headPath.push([currentHead[0]-1, currentHead[1]])
  } else if (direction === 'U') {
    headPath.push([currentHead[0], currentHead[1]+1])
  }

  moveKnots(rope)

  return moveHead(rope, direction, counter+1, numMoves)
}

const moveKnots = (rope, currentKnotIndex=1) => {
  if (currentKnotIndex >= rope.length) return

  const leadKnot = rope[currentKnotIndex-1][rope[currentKnotIndex-1].length-1]
  const currentKnotPath = rope[currentKnotIndex]
  const currentKnot = currentKnotPath[currentKnotPath.length-1
  const coords = nextKnotCoords(leadKnot, currentKnot)
  if (coords) currentKnotPath.push(coords)

  return moveKnots(rope, currentKnotIndex + 1)
}

const nextKnotCoords = (head, tail) => {
  console.log(head, tail, headIsAdjacent(head, tail))
  if (headIsAdjacent(head, tail)) return

  const xDiff = head[0] - tail[0]
  const yDiff = head[1] - tail[1]
  const xDiffAbs = Math.abs(xDiff)
  const yDiffAbs = Math.abs(yDiff)

  let newTail
  if (head[0] === tail[0]) {
    if (yDiff > 0) {
      newTail = [tail[0], tail[1]+1]
    } else {
      newTail = [tail[0], tail[1]-1]
    }
  } else if (head[1] === tail[1]) {
    if (xDiff > 0) {
      newTail = [tail[0]+1, tail[1]]
    } else {
      newTail = [tail[0]-1, tail[1]]
    }
  } else if (yDiffAbs === 2 && xDiffAbs === 2) {
    newTail = [tail[0]+xDiff/2, tail[1]+yDiff/2]
  } else if (yDiffAbs > xDiffAbs){
    if (yDiff > 0) {
      newTail = [head[0], tail[1]+1]
    } else {
      newTail = [head[0], tail[1]-1]
    }
  } else if (xDiffAbs > yDiffAbs) {
    if (xDiff > 0) {
      newTail = [tail[0]+1, head[1]]
    } else {
      newTail = [tail[0]-1, head[1]]
    }
  }


  return newTail
}

const headIsAdjacent = (head, tail) => tail.every((coord, index) => Math.abs(coord - head[index]) <= 1)
