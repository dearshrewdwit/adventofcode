SLOPES = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

def tick(seats)
  new_seats = seats.map.with_index do |row, row_index|
    row.chars.map.with_index { |seat, col_index| process(row_index, col_index, seats) }.join
  end
  return seats if new_seats == seats
  tick(new_seats)
end

def process(row_index, col_index, seats)
  seat = seats[row_index][col_index]
  return '.' if seat == '.'
  visible_seats = find_visible_seats(row_index, col_index, seats)
  return '#' if seat == 'L' && visible_seats.count('#').zero?
  return 'L' if seat == '#' && visible_seats.count('#') >= 4
  seat
end

def find_visible_seats(row_index, col_index, seats)
  SLOPES.filter_map do |slope| 
    new_row_index, new_col_index = row_index + slope[0], col_index + slope[1]
    next if [new_row_index, new_col_index].any?(&:negative?) || new_col_index >= seats.first.length || new_row_index >= seats.length
    seats[new_row_index][new_col_index]
  end
end

seats = File.open('input.txt').readlines(chomp: true)
p tick(seats).join.count('#')
