const fs = require('fs')
const util = require('util')
fs.readFile('data.txt', 'utf8' , (err, data) => {
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
      addresses = []
      const bin = ("000000000000000000000000000000000000" + (Number(operation[0])).toString(2)).slice(-36)
      const float = bin.split('').map((char, index) => {
        if (mask[index] === '0' && bin[index] === '1') {
          return bin[index]
        } else {
          return mask[index]
        }
      }).join('')
      completeFloats(float)
      addresses.forEach(address => mem[parseInt(address, 2)] = Number(operation[1]))
    })
  })
  console.log(Object.values(mem).reduce((a,b) => a + b))
})

let addresses = []
function completeFloats(float) {
  if (!float.includes('X')) {
    addresses.push(float)
    return
  }

  const index = float.indexOf('X')
  const a = float.split('')
  const b = float.split('')
  a[index] = '0'
  b[index] = '1'
  completeFloats(a.join(''))
  completeFloats(b.join(''))
}
