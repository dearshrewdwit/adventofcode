file = open("data.txt")
lines = file.read().splitlines()

rules = {
    "red": 12,
    "green": 13,
    "blue": 14
}

def is_possible(game):
    possible = True
    for round in game['rounds']:
        for colour_count in round.keys():
            if round[colour_count] > rules[colour_count]:
                possible = False
    return possible
                

def create_game_from(line):
    game = { 'rounds': [] }
    game_data = line.split(': ')
    game['id'] = int(game_data[0].split(' ')[1])
    rounds_data = game_data[1].split('; ')
    for round_data in rounds_data:
        round = {}
        colors = round_data.split(', ')
        for color in colors:
            [num, color] = color.split(' ')
            round[color] = int(num)
        game['rounds'].append(round)
    return game

possible_games = filter(is_possible, [create_game_from(line) for line in lines])
print(sum([game['id'] for game in possible_games]))
