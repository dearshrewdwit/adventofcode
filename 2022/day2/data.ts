import {
  Rules,
  Rules2,
  MovePts,
  MovePts2,
  Dict,
  ResultPts,
  MovesForResult
} from "./interfaces"

const rules: Rules = {
  'rock': 'scissors',
  'paper': 'rock',
  'scissors': 'paper'
}

const rules2: Rules2 = {
  "A": "C",
  "B": "A",
  "C": "B"
}

const dict: Dict = {
  'rock': ['A', 'X'],
  'paper': ['B', 'Y'],
  'scissors': ['C', 'Z']
}

const movePts: MovePts = {
  "rock": 1,
  "paper": 2,
  "scissors": 3
}

const movePts2: MovePts2 = {
  "A": 1,
  "B": 2,
  "C": 3
}

const resultPts: ResultPts = {
  "X": 0,
  "Y": 3,
  "Z": 6
}

const movesForResult: MovesForResult = {
  "X": (oppMove: string) => rules2[oppMove],
  "Y": (oppMove: string) => oppMove,
  "Z": (oppMove: string) => Object.keys(rules2).find((move) => rules2[move] === oppMove) ?? ""
}

export {
  rules,
  rules2,
  movePts,
  movePts2,
  dict,
  resultPts,
  movesForResult
}
