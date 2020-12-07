class Bag
  attr_reader :inner_bags
  
  def initialize(colour, inner_bags)
    @colour = colour
    @inner_bags = inner_bags
    @contains_bag = false
  end

  def contains_bag?
    @contains_bag
  end

  def save
    @contains_bag = true
    self
  end
end

class Bags
  def initialize(bags)
    @bags = bags
  end

  def that_have(search_colour)
    @bags.filter_map { |_bag_colour, bag| bag.save if bag.inner_bags.keys.any? { |colour| has_bag?(colour, search_colour) }}
  end

  def inside(colour, number = 1)
    inner_bags = @bags[colour].inner_bags
    return 0 if inner_bags.empty?

    inner_bags.map { |inner_bag_data| inner_bag_data[1] + (inner_bag_data[1] * inside(*inner_bag_data)) }.sum
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
        bag_count, bag_colour = bag_data[0], bag_data[2..-1].gsub(/ bag[s]?[.]?/, '')
        next unless !!bag_count.match(/\d/) 
        bag_hash[bag_colour] = bag_count.to_i
      end
      hash[bag_raw[0]] = Bag.new(bag_raw[0], inner_bags)
    end
end

bags = Bags.new(bags_data)
p bags.that_have('shiny gold').length
p bags.inside('shiny gold')
