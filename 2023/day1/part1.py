import re

file = open("data.txt")
lines = file.read().splitlines()

nums = [re.findall("\d", line) for line in lines]

answer = sum([int(row[0] + row[-1]) for row in nums])

print(answer)
