class Instruction
  attr_accessor :type
  attr_reader :value
  
  TYPES = {
    'acc' => Proc.new { |acc, index, value| [acc + value, index + 1] },
    'jmp' => Proc.new { |acc, index, value| [acc, index + value] },
    'nop' => Proc.new { |acc, index, value| [acc, index + 1] }
  }

  def initialize(type, value)
    @type = type
    @value = value.to_i
    @executed = false
  end

  def execute(acc, index)
    @executed = true
    TYPES[type].call(acc, index, value)
  end

  def executed?
    @executed
  end

  def refresh
    @executed = false
    self
  end
end

class Debugger
  CHANGES = {
    'jmp' => 'nop',
    'nop' => 'jmp'
  }

  def initialize(instruction_set)
    @instruction_set = instruction_set
  end

  def debug(index = 0)
    instructions = @instruction_set.refresh
    return if index >= instructions.length
    instruction = instructions[index]
    type = CHANGES.fetch(instruction.type, instruction.type)
    instructions[index] = Instruction.new(type, instruction.value)

    @instruction_set.execute(0, 0, instructions)
    
    debug(index + 1)
  end
end

class InstructionSet
  attr_reader :instructions

  def initialize(instructions)
    @instructions = instructions
  end
  
  def execute(acc = 0, index = 0, instructions = @instructions)
    p acc if index == instructions.length
    return unless index.between?(0, instructions.length - 1)
    instruction = instructions[index]
    return if instruction.executed?
    
    acc, next_index = instruction.execute(acc, index)

    execute(acc, next_index, instructions)
  end
  
  def refresh
    @instructions.map(&:refresh)
  end
end

instructions = File.open('input.txt', 'r') do |file|
  file.readlines.map(&:split).map { |data| Instruction.new(data[0], data[1]) }
end

instruction_set = InstructionSet.new(instructions)
# instruction_set.execute

Debugger.new(instruction_set).debug
