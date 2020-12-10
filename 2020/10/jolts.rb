def find_nodes(list)
  list.filter_map.with_index do |number, index|
    list[(index+1)..(index+3)].select { |num| num <= number + 3 }.flatten
  end.select { |nodes| nodes.length > 1 }
end

def tree_end_index(list, index)
  return index if list[index].length < 3
  tree_end_index(list, index + 1)
end

def branches(node_set, tree_start_index = 0, branch_set = [])
  return branch_set if tree_start_index == node_set.length
  if node_set[tree_start_index].length > 2
    tree_end_index = tree_end_index(node_set, tree_start_index)
    tree_branches = 4 + ((tree_end_index - tree_start_index - 1) * 3)
    branches(node_set, tree_end_index + 1, branch_set << tree_branches)
  else
    branches(node_set, tree_start_index + 1, branch_set << 2)
  end
end

jolts = File.open('input.txt', 'r').readlines.map(&:to_i).sort.unshift(0)
jolts << jolts[-1] + 3

differences = jolts.filter_map.with_index { |jolt, index| jolts[index+1] - jolt unless index == jolts.length - 1 }

p differences.count(1) * differences.count(3)
p branches(find_nodes(jolts)).reduce(:*)
