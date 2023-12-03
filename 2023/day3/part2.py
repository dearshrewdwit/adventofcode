import re

file = open("data.txt")
lines = file.read().splitlines()

def is_symbol(y, x):
    try:
        if re.search("[*]", lines[y][x]):
            return True
    except:
        return False

def find_gear_symbols(number):
        y = number['y']
        indexes = number['x']
        gear_symbols = []
        
        #bottom
        i = indexes[0]-1
        while i <= indexes[-1]+1:
            if is_symbol(y+1, i):
                gear_symbols.append([y+1, i])
            i+=1
        
        #middle left
        if is_symbol(y, indexes[0]-1):
            gear_symbols.append([y, indexes[0]-1])
        
        # middle right
        if is_symbol(y, indexes[-1]+1):
            gear_symbols.append([y, indexes[-1]+1])

        #top
        j = indexes[0]-1
        while j <= indexes[-1]+1:
            if is_symbol(y-1, j):
                gear_symbols.append([y-1, j])
            j+=1
        
        for symbol in gear_symbols:
            found_pgear = False
            for pgear in possible_gears:
                if symbol[0] == pgear['y'] and symbol[1] == pgear['x']:
                    found_pgear = pgear
            if found_pgear:
                found_pgear['numbers'].append(number)
            else:
                possible_gears.append({'y': symbol[0], 'x': symbol[1], 'numbers': [number]})
        
possible_gears = []
y = 0
while y < len(lines):
    line = lines[y]
    number = { 'x': [], 'y': y}

    x = 0
    while x < len(line):
        char = line[x]

        if re.match("\d", char):
            number['x'].append(x)
            if x == len(line)-1:
                number['group'] = ''.join([lines[y][x] for x in number['x']])
                find_gear_symbols(number) 
                number = { 'x': [], 'y': y}
        elif not re.match("\d", char) and len(number['x']) > 0:
            number['group'] = ''.join([lines[y][x] for x in number['x']])
            find_gear_symbols(number) 
            number = { 'x': [], 'y': y}
        elif not re.match("\d", char):
            number = { 'x': [], 'y': y}
        x += 1
    y += 1

gears = [gear for gear in possible_gears if len(gear['numbers']) == 2]

print(sum([int(gear['numbers'][0]['group']) * int(gear['numbers'][1]['group']) for gear in gears]))
