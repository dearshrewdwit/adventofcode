def find_nodes(list)
  list.filter_map.with_index do |number, index|
    list[(index+1)..(index+3)].select { |num| num >= number - 3 }.flatten
  end.select { |nodes| nodes.length > 1 }
end

def find_end_node(list, index)
  return index if list[index].length < 3
  find_end_node(list, index + 1)
end

def branches(node_set, index = 0, branch_set = [])
  return branch_set if index == node_set.length
  if node_set[index].length > 2
    end_node_index = find_end_node(node_set, index)
    branches(node_set, end_node_index + 1, branch_set << 4 + ((end_node_index - index - 1) * 3))
  else
    branches(node_set, index + 1, branch_set << 2)
  end
end

jolts = File.open('input.txt', 'r').readlines.map(&:to_i).sort.unshift(0)
jolts << jolts[-1] + 3

differences = jolts.filter_map.with_index { |jolt, index| jolts[index+1] - jolt unless index == jolts.length - 1 }

p differences.count(1) * differences.count(3)
p branches(find_nodes(jolts.reverse)).reduce(:*)
