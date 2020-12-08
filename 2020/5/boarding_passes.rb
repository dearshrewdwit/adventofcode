class BoardingPass
  def initialize(data)
    @row_data = data[0..6]
    @column_data = data[7..9]
  end

  def seat_id
    row * 8 + column
  end

  private

  def row
    search(@row_data, 0, 0, 127, nil)
  end

  def column
    search(@column_data, 0, 0, 7, nil)
  end

  def search(data, index, start, stop, num) 
    return num if index == data.length
    
    mid = (start + stop) / 2
    start, stop = if ['B', 'R'].include?(data[index])
                    num = stop if index == data.length - 1
                    [mid + 1, stop]
                  else
                    num = start if index == data.length - 1
                    [start, mid]
                  end

    search(data, index + 1, start, stop, num)
  end
end

class SeatFinder
  def initialize(passes)
    @passes = passes
  end

  def empties
    sorted_passes = @passes.sort_by(&:seat_id)
    sorted_passes.filter_map.with_index do |pass, index|
      next_pass = sorted_passes[index+1]
      pass.seat_id + 1 if !next_pass.nil? && pass.seat_id + 1 != next_pass.seat_id
    end
  end
end

passes = File.open('input.txt', 'r') { |file| file.readlines.map { |line| BoardingPass.new(line.chomp) }}

p passes.map(&:seat_id).max
p SeatFinder.new(passes).empties
