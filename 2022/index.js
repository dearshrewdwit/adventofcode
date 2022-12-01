const [day, part] = process.argv[2].split(':')

let path = `./build/day${day}/part${part}.js`

require(path)
