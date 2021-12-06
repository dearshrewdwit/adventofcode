bus_ids = File.open('test-data.txt', 'r').readlines[1].split(',').map { |item| item != 'x' ? item.to_i : item }
abc = bus_ids.filter_map.with_index { |id,index| [id, index] if id != 'x' }.to_h
#p offsets = abc.map { |k,v| k+v}
#p offsets.reduce(:lcm)
sorted = abc.sort_by { |k,v| k }.reverse
p sorted

def extended_gcd(a, b)
  last_remainder, remainder = a.abs, b.abs
  x, last_x, y, last_y - 0, 1, 1, 0
  loop do
    break if remainder == 0
    last_remainder, (quotient, remainder) = remainder, last_remainder.divmod(remainder)
    x, last_x = last_x - quotient*x, x
    y, last_y = last_y - quotient*y, y
  end
  
  last_remainder, last_x * ( a < 0 ? -1 : 1)
end



