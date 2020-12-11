DIRECTIONS = [
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
  new_seats = seats.map.with_index do |seats_row, row|
    seats_row.chars.map.with_index { |seat, col| process(row, col, seats) }.join
  end
  return seats if new_seats == seats
  tick(new_seats)
end

def process(row, col, seats)
  seat = seats[row][col]
  return '.' if seat == '.'
  visible_seats = find_visible_seats(row, col, seats)
  return '#' if seat == 'L' && visible_seats.count('#').zero?
  return 'L' if seat == '#' && visible_seats.count('#') >= 5
  seat
end

def find_visible_seats(row, col, seats)
  DIRECTIONS.filter_map { |direction| first_visible_seat(row, col, seats, direction) }
end

def first_visible_seat(row, col, seats, direction, seat ='.')
  col, row = col + direction[0], row + direction[1]
  return seat if seat != '.'
  return if [row, col].any?(&:negative?) || col >= seats.first.length || row >= seats.length
  first_visible_seat(row, col, seats, direction, seats[row][col])
end

seats = File.open('input.txt', 'r').readlines(chomp: true)
p tick(seats).join.count('#')
