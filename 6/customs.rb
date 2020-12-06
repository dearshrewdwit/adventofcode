class CustomsGroup
  def initialize(data)
    @data = data
  end

  def answer_count
    aggregate_data.length
  end

  def answers_by_everyone
    aggregate_data.reject { |_answer, count| count != @data.length }.length
  end

  private

  def aggregate_data
    @data.join.chars.each_with_object(Hash.new(0)) { |answer, counter| counter[answer] += 1 }
  end
end

groups = File.open('input.txt', 'r') do |file|
  file.readlines.join.split("\n\n").map do |answers_raw|
    CustomsGroup.new(answers_raw.split("\n"))
  end
end   

p groups.map(&:answer_count).sum
p groups.map(&:answers_by_everyone).sum
