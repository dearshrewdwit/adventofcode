class Cipher
  def initialize(numbers)
    @numbers = numbers
  end

  def weak_numbers(preamble:)
    @numbers.filter_map.with_index do |number, index|
      next if index < preamble
      previous_five = @numbers[(index-preamble)..(index-1)]
      number if previous_five.combination(2).map(&:sum).none? {|sum| sum == number }
    end
  end
  
  def sets(sum:)
    @numbers.filter_map.with_index { |number, index| find(@numbers[index..-1], 0, sum) }
  end

  private

  def find(numbers, index, sum, set = [])
    return set if set.length >= 2 && set.sum == sum
    return if index == numbers.length
    return if set.sum > sum
    set << numbers[index]
    find(numbers, index + 1, sum, set)
  end
end

numbers = File.open('input.txt', 'r').readlines(chomp: true).map(&:to_i)
cipher = Cipher.new(numbers)
p weak_number = cipher.weak_numbers(preamble: 25).first

set = cipher.sets(sum: weak_number).first
p set.min + set.max
