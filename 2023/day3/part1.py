import re

file = open("data.txt")
lines = file.read().splitlines()

def is_symbol(y, x):
    try:
        return not not re.search("[^.\d]", lines[y][x])
    except:
        return False

def is_symbol_adjacent(y, x):
        return any([
            is_symbol(y-1, x-1),
            is_symbol(y-1, x),
            is_symbol(y-1, x+1),
            is_symbol(y, x-1),
            is_symbol(y, x+1),
            is_symbol(y+1, x-1),
            is_symbol(y+1, x),
            is_symbol(y+1, x+1),
        ])
        
answer = []
y = 0
while y < len(lines):
    line = lines[y]
    current = {}

    x = 0
    while x < len(line):
        char = line[x]
        if re.match("\d", char):
            current[x] = char

        if x == len(line)-1 or not re.match("\d", char):
            if any([is_symbol_adjacent(y, i) for i in current.keys()]):
                answer.append(current)
            current = {}
        x += 1
    y += 1

print(sum([int(''.join(num.values())) for num in answer]))
