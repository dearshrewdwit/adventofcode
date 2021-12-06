const fs = require('fs')
const util = require('util')

let count = 0
fs.readFile('data.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const timersObj = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
  data.trim().split(",").forEach(timer => timersObj[timer]+=1)
  console.log(processTicks(timersObj, 0, 256))
})

function processTicks(timersObj, tick, end) {
  if (tick === end) return Object.values(timersObj).reduce((a,b) => a+b)

  const nextTimersObj = {}
  const births = timersObj[0]
  const keys = Object.keys(timersObj)
  keys.forEach(key => {
    let shift = key-1
    if (shift < 0) {
    } else {
      nextTimersObj[shift] = timersObj[key]
    }
  })
  nextTimersObj[6]+= births
  nextTimersObj[8] = births

  return processTicks(nextTimersObj, tick+1, end)
}
