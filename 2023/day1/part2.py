import re

file = open("data.txt")
lines = file.read().splitlines()
str_nums = {
  "one": '1',
  "two": '2',
  "three": '3',
  "four": '4',
  "five": '5',
  "six": '6',
  "seven": '7',
  "eight": '8',
  "nine": '9'
}
answer = []
for line in lines:
  ints = {}

  for m in re.finditer("\d", line):
    ints[m.start(0)] = m.group()

  for i in str_nums.keys():
    for m in re.finditer(i , line):
      ints[m.start(0)] = m.group()

  sorted_items = sorted(ints.items(), key=lambda items: items[0])
  digits = [sorted_items[0][1], sorted_items[-1][1]]
  line_result = [str_nums.get(digit, digit) for digit in digits]
  answer.append(int(''.join(line_result)))

print(sum(answer))
