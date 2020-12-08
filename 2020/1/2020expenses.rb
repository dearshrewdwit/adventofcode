class ExpenseFile
  def initialize(file_path)
    @file = File.open(file_path, 'r')
  end

  def expenses
    unless @expenses
      @expenses = []
      @file.each_line { |line| @expenses << line.chomp.to_i }
    end
    @expenses
  end
end

class SumCombination
  def initialize(array, sum)
    @array = array
    @sum = sum
  end

  def combinations(size)
    @answers = []
    find([], [], 1, size)
    @answers.map(&:sort).uniq.flatten
  end

  def find(items, indexes, stop, size)
    return if stop > size
    @array.each_with_index do |expense, index|
      current_indexes = (indexes + [index])
      current_items = (items + [expense])
      next if current_indexes.length != current_indexes.uniq.length 
      next if current_items.sum > @sum
			
      @answers << current_items if current_items.sum == @sum && stop == size
			
      find(current_items, current_indexes, stop + 1, size)
    end
  end
end

file = ExpenseFile.new('input.txt')

sum = SumCombination.new(file.expenses, 2020)

p sum.combinations(2)
p sum.combinations(3)

