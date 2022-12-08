type Coords = [number, number]

interface NextCoords {
  up: (rIndex: number, cIndex: number) => Coords;
  down: (rIndex: number, cIndex: number) => Coords;
  left: (rIndex: number, cIndex: number) => Coords;
  right: (rIndex: number, cIndex: number) => Coords;
}

export {
  Coords,
  NextCoords
}
