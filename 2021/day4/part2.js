const fs = require('fs')
const util = require('util')

fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const boardData = data.trim().split("\n\n")
  const order = boardData.shift().split(',')
  const boards = boardData.map(data => {
    const lines = data.split("\n").map(row => {
      const cleanedRow = row.replace(/  /g, ' ').trim()
      return cleanedRow.split(' ')
    })
    return new Board(lines)
  })

  let board, currentNumber
  let winningBoards = []
  for (let i=0; i<order.length; i++) {
    for (let j=0; j<boards.length; j++) {
      board = boards[j]
      if (winningBoards.includes(board)) continue

      board.mark(order[i])

      if (board.isComplete()) {
        currentNumber = order[i]
        winningBoards.push(board)
      }
    }
  }

  console.log(winningBoards[winningBoards.length-1].unmarkedSum()*currentNumber)
})


class Board {
  constructor(lines) {
    this.lines = lines.map(line => line.map(num => {
      return { number: num, isMarked: false }
    }))
  }

  mark(num) {
    const cell = this.lines.flat().find(cell => cell.number === num)
    if (cell !== undefined) cell.isMarked = true
  }

  isComplete() {
    const columns = []
    for (let i=0; i<this.lines.length; i++){
      const column = []
      this.lines.forEach(row => column.push(row[i]))
      columns.push(column)
    }
    return this.lines.some(row => this.check(row)) || columns.some(column => this.check(column))
  }

  check(line) {
    return line.every(cell => cell.isMarked)
  }

  unmarkedSum() {
    return this.lines.flat().filter(cell => !cell.isMarked).reduce((a, b) => a + Number(b.number), 0)
  }
}
