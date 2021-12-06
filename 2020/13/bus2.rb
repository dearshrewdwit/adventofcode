bus_ids = File.open('input.txt', 'r').readlines[1].split(',').map { |item| item != 'x' ? item.to_i : item }
abc = bus_ids.filter_map.with_index { |id,index| [id, index] if id != 'x' }.to_h
#p offsets = abc.map { |k,v| k+v}
#p offsets.reduce(:lcm)
sorted = abc.sort_by { |k,v| k }.reverse
p sorted

timestamp = sorted[0][0]
loop do
  break if sorted[1..-1].all? do |bus_id, offset|
    #p "t: #{timestamp} + #{offset} % #{bus_id} = #{((timestamp + offset) % bus_id)}"
    ((timestamp - sorted[0][1] + offset) % bus_id).zero?
  end
  timestamp += sorted[0][0]
end

p timestamp
