interface Rules {
  rock: string;
  paper: string;
  scissors: string;
}

interface Dict {
  rock: string[];
  paper: string[];
  scissors: string[];
}

interface MovePts {
  rock: number;
  paper: number;
  scissors: number;
}

interface Rules2 {
  A: string;
  B: string;
  C: string;
}

interface MovePts2 {
  A: number;
  B: number;
  C: number;
}

interface ResultPts {
  X: number;
  Y: number;
  Z: number;
}

interface MovesForResult {
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
