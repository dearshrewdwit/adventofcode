class PasswordFile
        def initialize(file_path)
                @file = File.open(file_path, 'r')
        end     
                        
        def lines    
                unless @lines
                        @lines = []
			@file.each_line { |line| @lines << PasswordLine.new(line.chomp) }
                end
                @lines
        end
end

class PasswordLine
	def initialize(line)
		@line = line.split
	end

	def lower_bound
		@line[0].split('-')[0].to_i
	end

	def upper_bound
		@line[0].split('-')[1].to_i
	end

	def letter
		@line[1][0...-1]
	end

	def text
		@line[2]
	end
end

class WithinRange
	def initialize(password_line)
		@password_line = password_line
	end

	def valid?
		password_line.text.chars.count(password_line.letter).between?(password_line.lower_bound, password_line.upper_bound)
	end

	private

	attr_reader :password_line
end

class ExactlyOnePosition
	def initialize(password_line)
		@password_line = password_line
	end

	def valid?
		[password_line.text[password_line.lower_bound - 1], password_line.text[password_line.upper_bound - 1]].count(password_line.letter) == 1
	end

	private

	attr_reader :password_line
end

class PolicyCheck
	def initialize(password_lines)
		@password_lines = password_lines
	end

	def valid_lines(policy)
		@password_lines.select do |password_line|
			policy.new(password_line).valid?
		end
	end
end

file = PasswordFile.new('input.txt')

policy_check = PolicyCheck.new(file.lines)

p policy_check.valid_lines(WithinRange).length
p policy_check.valid_lines(ExactlyOnePosition).length


