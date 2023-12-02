file = open("data.txt")
lines = file.read().splitlines()

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

def apply_minimum_color_counts(game):
    game['red'] = 0
    game['green'] = 0
    game['blue'] = 0

    for round in game['rounds']:
        for colour_count in round.keys():
            if round[colour_count] > game[colour_count]:
                game[colour_count] = round[colour_count]
    return game

games = [apply_minimum_color_counts(create_game_from(line)) for line in lines]
print(sum([game['red']*game['green']*game['blue'] for game in games]))
