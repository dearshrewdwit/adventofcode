const fs = require('fs')
const util = require('util')

fs.readFile('test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const timers = data.trim().split(",")
  console.log(processTicks(timers, 0, 18))
})

function processTicks(timers, tick, end) {
  if (tick === end) return (timers.length)
  const length = timers.length
  for (let i=0; i<length; i++) {
    timers[i]--
    if (timers[i] < 0) {
      timers.push(8)
      timers[i] = 6
    }
  }

  return processTicks(timers, tick+1, end)
}
