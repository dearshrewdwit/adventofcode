const { readFile } = require('fs/promises')
let sum = 0

export const main = async () => {
  const data: string = await readFile('./day7/input.txt', 'utf8')

  const fs = data.trim().split("\n").reduce((fs, line) => {
    const tokens = line.split(' ')

    if (tokens[1] === 'cd') {
      if (tokens[2] === '..') {
        fs.head.pop()
      } else {
        fs.head.push(tokens[2])
      }
    }

    const currentDir = findCurrentDir(fs.tree, fs.head)

    if (tokens[0] === 'dir') {
      currentDir.contents.push({type: 'dir', name: tokens[1], size: 0, contents: []})
    } else if ((/[0-9]+/g).test(tokens[0])) {
      currentDir.contents.push({type: 'file', name: tokens[1], size: Number(tokens[0]) })
    }
    return fs
  }, {
    head: [],
    tree: [{type: 'dir', name: '/', size: 0, contents: []}]
  })

  fs.tree[0].size = calculateDirSizes(fs.tree)
  return sum
}

const findCurrentDir = (tree, dirPath, dir = null, index=0) => {
  if (index+1 > dirPath.length) return dir
  const workingDir = tree.find(item => item.name === dirPath[index])
  return findCurrentDir(workingDir.contents, dirPath, workingDir, index+1)
}

const calculateDirSizes = (contents, size, index=0) => {
  if (index+1 > contents.length) return size
  const item = contents[index]
  if (item.type === 'file') {
    size += item.size
  } else {
    const subDirSize = calculateDirSizes(item.contents, 0, 0)
    if (subDirSize < 100000) sum += subDirSize
    item.size = subDirSize
    size += subDirSize
  }
  return calculateDirSizes(contents, size, index+1)
}
