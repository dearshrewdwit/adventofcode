class Bag
  attr_reader :inner_bags
  
  def initialize(inner_bags)
    @inner_bags = inner_bags
    @contains_bag = false
  end

  def contains_bag?
    @contains_bag
  end

  def contains_bag
    @contains_bag = true
  end
end

class Bags
  def initialize(bags)
    @bags = bags
  end

  def that_have(search_colour)
    @bags.filter_map do |bag_colour, bag|
      if bag.inner_bags.keys.any? { |colour| has_bag?(colour, search_colour) }
        bag.contains_bag
        bag_colour
      end
    end
  end

  def inside(search_colour, number = 1)
    count([search_colour, number])
  end
  
  private

  def count(bag_data)
    inner_bags = @bags[bag_data[0]].inner_bags
    return 0 if inner_bags.empty?
    inner_bags.map do |inner_bag_data|
      (inner_bag_data[1]) + ((inner_bag_data[1]) * (count(inner_bag_data)))
    end.sum
  end

  def has_bag?(colour, search_colour)
    bag = @bags[colour]
    return true if bag.contains_bag? 
    return true if colour == search_colour
    return false if bag.inner_bags.empty?
    
    bag.inner_bags.keys.any? { |inner_bag_colour| has_bag?(inner_bag_colour, search_colour) }
  end
end 

bags_data = File.open('input.txt', 'r') do |file|
  file.readlines(chomp: true)
    .map { |line| line.split(' bags contain ') }
    .each_with_object({}) do |bag_raw, hash|
      inner_bags = bag_raw[1].split(', ').each_with_object({}) do |bag_data, bag_hash|
        bag_colour = bag_data[2..-1].gsub(/ bag[s]?[.]?/, '')
        bag_count = bag_data[0]
        next unless !!bag_count.match(/\d/) 
        bag_hash[bag_colour] = bag_count.to_i
      end

      hash[bag_raw[0]] = Bag.new(inner_bags)
    end
end

bags = Bags.new(bags_data)
p bags.that_have('shiny gold').length
p bags.inside('shiny gold')
