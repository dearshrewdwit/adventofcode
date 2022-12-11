const util = require('util')

const [day, num] = process.argv[2].split(':')

const part = `part${num}`
const dayPath = `./build/day${day}`
const solutionPath = `${dayPath}/src/${part}.js`
const answersPath = `${dayPath}/spec/answers.js`

const fn = require(solutionPath).main
const { answers } = require(answersPath)

const run = async () => {
  const res = await fn()
  const answer = answers[part]
  if (answer === undefined) {
    console.log(res)
  } else if (res === answer) {
    console.log(`✅ passed\nanwser: ${util.inspect(res)}`)
  } else {
    console.log(`❌ failed\ngot:      ${util.inspect(res)}\nexpected: ${util.inspect(answer)}`)
  }
}

run()
