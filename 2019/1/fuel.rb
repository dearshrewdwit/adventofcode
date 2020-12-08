class Module
  def initialize(mass: )
    @mass = mass
  end

  def fuel(acc = 0, mass = @mass)
    return acc if mass <= 8 
    mass = mass / 3 - 2
    fuel(acc + mass, mass)
  end
end

modules = File.open('input.txt', 'r') { |file| file.readlines(chomp: true) }.map { |line| Module.new(mass: line.to_i) }

p modules.map(&:fuel).sum
