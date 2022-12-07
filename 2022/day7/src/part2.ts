import {
  FileSystem,
  File,
  Directory
} from './types'
const { readFile } = require('fs/promises')
const dirSizes: number[] = []

export const main = async () => {
  const data: string = await readFile('./day7/input.txt', 'utf8')

  const fs: FileSystem = data.split('\n').reduce((fs: FileSystem, line) => {
    const tokens = line.split(' ')

    if (tokens[1] === 'cd') {
      if (tokens[2] === '..') {
        fs.head.pop()
      } else {
        fs.head.push(tokens[2])
      }
    } else {
      const currentDir: Directory = findCurrentDir(fs.tree, fs.head, fs.tree[0])
      if (tokens[0] === 'dir') {
        currentDir.contents.push({ type: 'dir', name: tokens[1], size: 0, contents: [] })
      } else if ((/[0-9]+/g).test(tokens[0])) {
        currentDir.contents.push({ type: 'file', name: tokens[1], size: Number(tokens[0]) })
      }
    }

    return fs
  }, {
    head: [],
    tree: [{ type: 'dir', name: '/', size: 0, contents: [] }]
  })

  calculateDirSizes(fs.tree)

  const freeSpace = 70000000 - fs.tree[0].size
  const neededSpace = 30000000 - freeSpace

  return dirSizes.sort((a, b) => a - b).find(size => size > neededSpace)
}

const findCurrentDir = (contents: Array<Directory | File>, dirPath: string[], dir: Directory, index = 0): Directory => {
  if (index + 1 > dirPath.length) return dir

  const workingDir: Directory = contents
    .filter(isDir)
    .find(item => item.name === dirPath[index]) ?? { name: '', type: '', size: 0, contents: [] }

  return findCurrentDir(workingDir.contents, dirPath, workingDir, index + 1)
}

const calculateDirSizes = (contents: Array<Directory | File>, size = 0, index = 0): number => {
  if (index + 1 > contents.length) return size

  const item = contents[index]

  if (isDir(item)) {
    const subDirSize = calculateDirSizes(item.contents)
    dirSizes.push(subDirSize)
    item.size = subDirSize
    size += subDirSize
  } else {
    size += item.size
  }
  return calculateDirSizes(contents, size, index + 1)
}

const isDir = (item: File | Directory): item is Directory => item.type === 'dir'
