const checkBoardBoundary = (x: number, y: number) => {
  const validPositions = [
    {x, y:y-125}, {x, y:y+125}, {x:x-125, y}, {x:x+125, y}, // up-down & left-right movement
    {x:x+125, y:y-125}, {x:x+125, y:y+125}, {x:x-125, y:y-125}, {x:x-125, y:y+125}  // diagonal movemen
  ]
  
  let edge = ((x == 0 || x == 500) && (y == 125 || y == 375) || (y == 0 || y == 500) && (x == 125 || x == 375))  ? true : false
  let between = (x ==250 && ((y == 125 || y == 375))) || (y == 250 && ((x == 125 || x == 375))) ? true : false
  if (edge) {
      return validPositions.slice(0, 4)
  }
  else if(between){
    return validPositions.slice(0, 4)
  }
  return validPositions
}

export const goatRules = ({ selectedPosition, p }: any) => {
  const x = selectedPosition.x;
  const y = selectedPosition.y;

  const newValidPosition = checkBoardBoundary(x, y);
  for (let i = 0; i < newValidPosition.length; i++) {
    if (p.x === newValidPosition[i].x && p.y === newValidPosition[i].y) {
      return true;
    }
  }

  return false;
}

export const tigerRules = ({ selectedPosition, p, validPositions, goatPositions, tigerPositions, setGoatPositions, capturedGoats, setCapturedGoats }: any) => {
  const x = selectedPosition.x;
  const y = selectedPosition.y;
  const newValidPosition = checkBoardBoundary(x, y);


  //  pahila check garne ki valid move ma hidi rako ta xaina ni, I mean normal move 
  // xa bhane
  for (let i = 0; i < newValidPosition.length; i++) {
    if (p.x === newValidPosition[i].x && p.y === newValidPosition[i].y) {
      if (!goatPositions.some((goat : any) => goat.x === p.x && goat.y === p.y) &&
          !tigerPositions.some((tiger : any) => tiger.x === p.x && tiger.y === p.y)) {
        return true;
      }
    }

  //   jump gare ko case ma
    const jumpOverGoat = goatPositions.find((goat : any) => goat.x === (x + p.x) / 2 && goat.y === (y + p.y) / 2);
    if (jumpOverGoat && !goatPositions.some((goat : any) => goat.x === p.x && goat.y === p.y) &&
        !tigerPositions.some((tiger : any) => tiger.x === p.x && tiger.y === p.y) &&
        validPositions.some((pos : any) => pos.x === p.x && pos.y === p.y)) {
          // yaha dekhi goat lai remove 
          setGoatPositions(goatPositions.filter((goat : any) => goat.name !== jumpOverGoat.name));
          setCapturedGoats(capturedGoats + 1);
      return true;
    }
  }

  return false;
};


