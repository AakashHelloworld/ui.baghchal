"use client";

import { useState } from "react";

type Position = {
  name: string;
  x: number;
  y: number;
};

type BoardPosition = {
  name: string;
  x: number;
  y: number;
};

type SelectedPosition = {
  player: string;
  name: string;
  x: number;
  y: number;
};

const validPositions: BoardPosition[] = [
  { name:'1', x: 0, y: 0 }, { name:'2', x: 125, y: 0 }, { name:'3', x: 250, y: 0 }, { name:'4', x: 375, y: 0 }, { name:'5', x: 500, y: 0},
  { name:'6', x: 0, y: 125 }, { name:'7', x: 125, y: 125 }, { name:'8', x: 250, y: 125 }, { name:'9', x: 375, y: 125 },{ name:'10', x: 500, y: 125},
  { name:'11', x: 0, y: 250 }, { name:'12', x: 125, y: 250 }, { name:'13', x: 250, y: 250 }, { name:'14', x: 375, y: 250 }, { name:'15',x: 500, y: 250},
  { name:'16', x: 0, y: 375 }, { name:'17', x: 125, y: 375 }, { name:'18', x: 250, y: 375 }, { name:'19', x: 375, y: 375 }, { name:'20',x: 500, y: 375},
  { name:'21', x: 0, y: 500 }, { name:'22', x: 125, y: 500 }, { name:'23', x: 250, y: 500 }, { name:'24', x: 375, y: 500 }, { name:'25', x: 500, y: 500},
];

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

export default function Board() {
  const [selectedPosition, setSelectedPosition] = useState<SelectedPosition | null>(null);
  const [goatPositions, setGoatPositions] = useState<Position[]>([
    { name: 'goat2', x: 0, y: 250 },
    { name: 'goat1', x: 250, y: 500 },
  ]);

  const [tigerPositions, setTigerPositions] = useState<Position[]>([
    { name: 'tiger1', x: 0, y: 0 },
    { name: 'tiger2', x: 500, y: 500 },
    { name: 'tiger3', x: 0, y: 500 },
    { name: 'tiger4', x: 500, y: 0 },
  ])

  const goatRules = ({ selectedPosition, p }: any) => {
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

  const tigerRules = ({ selectedPosition, p }: any) => {
    const x = selectedPosition.x;
    const y = selectedPosition.y;
    const validMoves = checkBoardBoundary(x, y);

    for (let move of validMoves) {
      const middleX = (x + move.x) / 2;
      const middleY = (y + move.y) / 2;

      // Check if there's a goat to jump over and the landing position is valid and empty
      const goatToCapture = goatPositions.find(goat => goat.x === middleX && goat.y === middleY);
      const isLandingEmpty = !goatPositions.some(goat => goat.x === move.x && goat.y === move.y) &&
                             !tigerPositions.some(tiger => tiger.x === move.x && tiger.y === move.y);

      if (move.x === p.x && move.y === p.y && goatToCapture && isLandingEmpty) {
        setGoatPositions(goatPositions.filter(goat => goat !== goatToCapture));
        return true;
      }
    }

    return false;
  }

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative h-[500px] w-[500px] border-2 border-white grid grid-cols-4 grid-rows-4">
        {/* Grid cells */}
        {Array.from({ length: 16 }).map((_, idx) => (
          <div key={idx} className="border-2 border-white"></div>
        ))}

        {/* Diagonal and diamond lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
        >
          {/* Outer diagonals */}
          <line x1="0" y1="0" x2="500" y2="500" stroke="white" strokeWidth="2" />
          <line x1="500" y1="0" x2="0" y2="500" stroke="white" strokeWidth="2" />

          {/* Inner diagonals for smaller squares */}
          <line x1="0" y1="250" x2="250" y2="500" stroke="white" strokeWidth="2" />
          <line x1="250" y1="0" x2="500" y2="250" stroke="white" strokeWidth="2" />
          <line x1="250" y1="0" x2="0" y2="250" stroke="white" strokeWidth="2" />
          <line x1="500" y1="250" x2="250" y2="500" stroke="white" strokeWidth="2" />
        </svg>

        {validPositions.map((p, index) => {
          const x = p.x;
          const y = p.y;
          return (
            <div
              key={index}
              style={{ top: `${y}px`, left: `${x}px` }}
              className="absolute transform opacity-100 translate-x-[-50%] translate-y-[-50%] bg-white h-[50px] w-[50px] rounded-full flex items-center justify-center"
            >
              {selectedPosition?.name && selectedPosition?.player === 'goat' && (
                <div
                  onClick={() => {
                    const rules = goatRules({ selectedPosition, p });
                    if (rules) {
                      const filteredPositions = goatPositions?.filter((gp) => gp.name !== selectedPosition?.name);
                      const newPosition = { name: selectedPosition?.name, x, y };
                      setGoatPositions([...filteredPositions, newPosition]);
                      setSelectedPosition(null);
                    } else {
                      setSelectedPosition(null);
                    }
                  }}
                  className="h-[30px] cursor-pointer w-[30px] border-2 border-orange-500 rounded-full"
                ></div>
              )}

              {selectedPosition?.name && selectedPosition?.player === 'tiger' && (
                <div
                  onClick={() => {
                      const rules = tigerRules({ selectedPosition, p });
                      const filteredPositions = tigerPositions?.filter((tp) => tp.name !== selectedPosition?.name);
                      const newPosition = { name: selectedPosition?.name, x, y };
                      setTigerPositions([...filteredPositions, newPosition]);
                      setSelectedPosition(null);
                      setSelectedPosition(null);
                  }}
                  className="h-[30px] cursor-pointer w-[30px] border-2 border-orange-500 rounded-full"
                ></div>
              )}
            </div>
          );
        })}

        {goatPositions?.length &&
          goatPositions.map((p, index) => (
            <div
              key={index}
              onClick={() => setSelectedPosition({ ...p, player: 'goat' })}
              style={{
                top: `${p.y}px`,
                left: `${p.x}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute cursor-pointer bg-green-700 h-[30px] w-[30px] rounded-full"
            ></div>
          ))}

        {tigerPositions?.length &&
          tigerPositions.map((p, index) => (
            <div
              key={index}
              onClick={() => setSelectedPosition({ ...p, player: 'tiger' })}
              style={{
                top: `${p.y}px`,
                left: `${p.x}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute cursor-pointer bg-red-700 h-[30px] w-[30px] rounded-full"
            ></div>
          ))}
      </div>
    </div>
  );
}
