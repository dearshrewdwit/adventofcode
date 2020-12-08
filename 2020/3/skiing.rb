class MapFile
  def initialize(file_path)
    @file = File.open(file_path, 'r')
  end     
                        
  def lines    
    unless @lines
      @lines = []
      @file.each_line { |line| @lines << line.chomp }
      @file.close
    end
    @lines
  end
end

class Map
  def initialize(grid)
    @grid = grid
    @width = @grid[0].length
  end

  def count(chars, current_x, current_y, char, x, y)
    return chars.length if current_y + y >= @grid.length
    current_char = @grid[current_y + y][(current_x + x) % @width]
    chars << current_char if current_char == char
    count(chars, current_x + x, current_y + y, char, x, y)
  end
end

file = MapFile.new('input.txt')

map = Map.new(file.lines)

p [
  map.count([], 0, 0, '#', 1, 1),
  map.count([], 0, 0, '#', 3, 1),
  map.count([], 0, 0, '#', 5, 1),
  map.count([], 0, 0, '#', 7, 1),
  map.count([], 0, 0, '#', 1, 2)
].inject(:*)
