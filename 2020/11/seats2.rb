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
  return 'L' if seat == '#' && visible_seats.count('#') >= 5
  seat
end

def find_visible_seats(row_index, col_index, seats, neighbours_indexes = [])
  SLOPES.filter_map { |slope| find_first_visible_seat(row_index, col_index, seats, slope) }
end

def find_first_visible_seat(row_index, col_index, seats, slope, seat ='.')
  col_index, row_index = col_index + slope[0], row_index + slope[1]
  return seat if seat != '.'
  return if [row_index, col_index].any?(&:negative?) || col_index >= seats.first.length || row_index >= seats.length
  find_first_visible_seat(row_index, col_index, seats, slope, seats[row_index][col_index])
end

seats = File.open('input.txt', 'r').readlines(chomp: true)
p tick(seats).join.count('#')
