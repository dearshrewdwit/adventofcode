lines = File.open('input.txt', 'r').readlines(chomp:true)

timestamp = lines[0].to_i
bus_ids = lines[1].split(',').reject(&'x'.method(:==)).map(&:to_i)

time_to_wait = bus_ids.map { |id| [id, id - timestamp % id] }.to_h

bus_id, time = time_to_wait.sort_by { |k, v| v }[0]

p bus_id * time:
