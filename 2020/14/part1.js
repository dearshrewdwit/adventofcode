const fs = require('fs')
const util = require('util')

fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const programsRaw = data.trim().split("mask = ")
  programsRaw.shift()
  const programs = programsRaw.map(program => {
    return program.split("\n").map((line, index) => {
      if (index === 0) return line
      line = line.replace("mem[", "")
      return line.split("] = ")
    })
  })

  const mem = {}
  programs.forEach(program => {
    const mask = program.shift()
    if (program[program.length-1][0] === '') program.pop()
    program.forEach(operation => {
      const bin = ("000000000000000000000000000000000000" + (Number(operation[1])).toString(2)).slice(-36)
      const masked = bin.split('').map((char, index) => {
        if (mask[index] !== 'X') {
          return mask[index]
        } else {
          return bin[index]
        }
      }).join('')

      mem[operation[0]] = parseInt(masked, 2)
    })
  })
  console.log(Object.values(mem).reduce((a,b) => a + b))
})
