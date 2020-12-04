class PassportFile
  def initialize(file_path)
    @file = File.open(file_path, 'r')
  end     
                        
  def lines    
    unless @lines
      @lines = []
      lines = @file.readlines
      lines.join.split("\n\n").map do |passport_raw|
        data = passport_raw.split.map { |data| data.split(':') }.to_h
        @lines << Passport.new(data)
      end
      
      @file.close
    end
    @lines
  end
end

class Passport
  FIELDS = %w(byr iyr eyr hgt hcl ecl pid cid)
  MANDATORY_FIELDS = FIELDS - %w(cid)
  UNITS = %w(cm in)
  COLOURS = %w(amb blu brn gry grn hzl oth)
  
  attr_reader *FIELDS

  def initialize(data)
    FIELDS.each { |field| instance_variable_set(('@' + field).to_sym, data.fetch(field, '')) }
  end

  def valid?
    MANDATORY_FIELDS.map { |field| self.send((field + '?').to_sym) }.all? 
  end

  private

  def byr?
    valid_year?(@byr, 1920, 2002)
  end

  def iyr?
    valid_year?(@iyr, 2010, 2020)
  end

  def eyr?
    valid_year?(@eyr, 2020, 2030)
  end

  def hgt?
    number, unit = @hgt[0...-2].to_i, @hgt[-2..-1]
    UNITS.include?(unit) && unit == 'cm' ? number.between?(150, 193) : number.between?(59, 76)
  end

  def hcl?
    !!@hcl.match(/^#\h{6}$/)    
  end

  def ecl?
    COLOURS.include?(@ecl)
  end

  def pid?
    !!@pid.match(/^\d{9}$/)
  end

  def valid_year?(str, from, to)
    !!str.match(/^\d{4}$/) && str.to_i.between?(from, to)
  end
end

passport_file = PassportFile.new('input.txt')

passports = passport_file.lines
p passports.select(&:valid?).length
