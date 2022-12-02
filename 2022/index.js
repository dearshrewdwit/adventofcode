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
    console.log(`✅ ${res}`)
  } else {
    console.log(`❌ got: ${res}, expected: ${answer}`)
  }
}

run()
