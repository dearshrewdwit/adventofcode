const fs = require('fs/promises')

export const main = async () => {
  const data: string = await fs.readFile('./day6/input.txt', 'utf8')
  
  return data.split('').findIndex((char, i) => (new Set(data.slice(i-3, i+1))).size === 4) + 1
}
