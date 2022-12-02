interface Rules {
  [index: string]: string;
  rock: string;
  paper: string;
  scissors: string;
}

interface Dict {
  [index: string]: string[];
  rock: string[];
  paper: string[];
  scissors: string[];
}

interface MovePts {
  [index: string]: number;
  rock: number;
  paper: number;
  scissors: number;
}

interface Rules2 {
  [index: string]: string;
  A: string;
  B: string;
  C: string;
}

interface MovePts2 {
  [index: string]: number;
  A: number;
  B: number;
  C: number;
}

interface ResultPts {
  [index: string]: number;
  X: number;
  Y: number;
  Z: number;
}

interface MovesForResult {
  [index: string]: (oppMove: string) => string;
  X: (oppMove: string) => string;
  Y: (oppMove: string) => string;
  Z: (oppMove: string) => string;
}

export {
  Rules,
  Rules2,
  Dict,
  MovePts,
  MovePts2,
  ResultPts,
  MovesForResult
}
