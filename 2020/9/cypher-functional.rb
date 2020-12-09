def weak_number(numbers, preamble = 25)
  numbers.filter_map.with_index do |number, index|
    next if index < preamble
    number if numbers[(index-preamble)..(index-1)].combination(2).map(&:sum).none? {|sum| sum == number }
  end.first
end

def encryption_weakness(numbers, weak_number)
  min_add_max(set(numbers, weak_number))
end

def numbers
  File.open('input.txt', 'r') { |file| file.readlines(chomp: true).map(&:to_i) }
end

def set(numbers, weak_number)
  numbers.filter_map.with_index { |number, index| find(numbers[index..-1], 0, weak_number) }.first
end

def find(numbers, index, sum, set = [])
  return set if set.length >= 2 && set.sum == sum
  return if index == numbers.length
  return if set.sum > sum
  find(numbers, index + 1, sum, set + [numbers[index]])
end

def min_add_max(set)
  set.min + set.max
end

p weak_number(numbers)
p encryption_weakness(numbers, weak_number(numbers))
