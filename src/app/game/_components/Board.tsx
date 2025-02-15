"use client";

import { useState, useEffect } from "react";
import { goatRules, tigerRules } from "@/lib/rules";
import {Position, SelectedPosition } from "@/types/Board";
import { validPositions } from "@/lib/validPosition";
import Image from "next/image";


export default function Board() {
  const [selectedPosition, setSelectedPosition] = useState<SelectedPosition | null>(null);
  const [selectedPositionFromTableGoat, setSelectedPositionFromTableGoat] = useState<any | null>(null);
  const [goatPositions, setGoatPositions] = useState<Position[]>([]);
  const [totalGoats, setTotalGoats] = useState(
    [
      { name: 'goat1' }, { name: 'goat2'},{ name: 'goat3'},{ name: 'goat4'},
      { name: 'goat5' },{ name: 'goat6'},{ name: 'goat7'},{ name: 'goat8'},
      { name: 'goat9'},{ name: 'goat10'},{ name: 'goat11'},{ name: 'goat12'},
      { name: 'goat13'},{ name: 'goat14'},{ name: 'goat15'},{ name: 'goat16'},
      { name: 'goat17'},{ name: 'goat18'},{ name: 'goat19'},{ name: 'goat20'}
    ]);

  const [turn, setTurn] = useState<'goat' | 'tiger'>('goat');
  const [winner, setWinner] = useState<string | null>(null);
  const [capturedGoats, setCapturedGoats] = useState(0);


  const [tigerPositions, setTigerPositions] = useState<Position[]>([
    { name: 'tiger1', x: 0, y: 0 },
    { name: 'tiger2', x: 500, y: 500 },
    { name: 'tiger3', x: 0, y: 500 },
    { name: 'tiger4', x: 500, y: 0 },
  ])

  useEffect(() => {
    // tiger won the game
    if (capturedGoats >= 5) {
      setWinner("Tiger");
      alert("Tiger won the game!");
    }else{
     tigerPositions.forEach((tiger) => {

    })
    }

}, [tigerPositions, goatPositions, capturedGoats]);

  return (
    <div className="w-full relative h-screen bg-gray-900 flex items-center justify-center">
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
          <line x1="0" y1="0" x2="500" y2="500" stroke="white" strokeWidth="1" />
          <line x1="500" y1="0" x2="0" y2="500" stroke="white" strokeWidth="1" />

          {/* Inner diagonals for smaller squares */}
          <line x1="0" y1="250" x2="250" y2="500" stroke="white" strokeWidth="1" />
          <line x1="250" y1="0" x2="500" y2="250" stroke="white" strokeWidth="1" />
          <line x1="250" y1="0" x2="0" y2="250" stroke="white" strokeWidth="1" />
          <line x1="500" y1="250" x2="250" y2="500" stroke="white" strokeWidth="1" />
        </svg>

        { validPositions.map((p, index) => {
          const x = p.x;
          const y = p.y;
          return (
            <div
              key={index}
              style={{ top: `${y}px`, left: `${x}px` }}
              className="absolute transform opacity-100 translate-x-[-50%] translate-y-[-50%] bg-white h-[50px] w-[50px] rounded-full flex items-center justify-center"
            >

              {
                selectedPositionFromTableGoat?.name && (
                  <div
                    onClick={() => {
                        const someGoat = goatPositions?.find((gp) => (gp.x === p.x && gp.y === p.y));
                        const someTiger = tigerPositions?.find((tp) => (tp.x === p.x && tp.y === p.y));
                        if(!(someGoat || someTiger)) {
                            const newPosition = { name: selectedPositionFromTableGoat?.name, x, y };
                            setGoatPositions([...goatPositions, newPosition]);
                            const filterGoatFromTable  =  totalGoats?.filter((gp) => gp.name !== selectedPositionFromTableGoat?.name);
                            setTotalGoats(filterGoatFromTable);
                            setSelectedPositionFromTableGoat(null);
                            setTurn('tiger');
                        }else{
                            setSelectedPositionFromTableGoat(null);
                        }
                    }}
                    className="h-[30px] cursor-pointer w-[30px] border-2 border-orange-500 rounded-full"
                  ></div>
                )
              }

              {selectedPosition?.name && selectedPosition?.player === 'goat' && (
                <div
                  onClick={() => {
                    const rules = goatRules({ selectedPosition, p });
                    if (rules) {
                      const filteredPositions = goatPositions?.filter((gp) => gp.name !== selectedPosition?.name);
                      const newPosition = { name: selectedPosition?.name, x, y };
                      setGoatPositions([...filteredPositions, newPosition]);
                      setSelectedPosition(null);
                      setTurn('tiger');
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
                    const rules = tigerRules({ selectedPosition, p, validPositions, goatPositions, tigerPositions, setGoatPositions, capturedGoats, setCapturedGoats});
                    if (rules) {
                      const filteredPositions = tigerPositions?.filter((tp) => tp.name !== selectedPosition?.name);
                      const newPosition = { name: selectedPosition?.name, x: p.x, y: p.y };
                      setTigerPositions([...filteredPositions, newPosition]);
                      setSelectedPosition(null);
                      setTurn('goat');
                    } else {
                      setSelectedPosition(null);
                    }
                  }}
                  className="h-[30px] cursor-pointer w-[30px] border-2 border-orange-500 rounded-full"
                ></div>
              )}
            </div>
          );
        })}





        {!!goatPositions?.length &&
          goatPositions.map((p, index) => {
            
            console.log(p)
            return(
            <div
              key={p.name}
              onClick={() => {
                if(turn === 'goat' && totalGoats.length == 0 ){
                  console.log('goat won the game')
                  setSelectedPositionFromTableGoat(null)
                  setSelectedPosition({ ...p, player: 'goat' })}}
                }
              style={{
                top: `${p.y}px`,
                left: `${p.x}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute cursor-pointer h-[40px] w-[40px] bg-green-700 rounded-full"
            >
              <Image src="/goat.png" alt="goat" width={40} height={40} />
            </div>
          )})}

        {
        !!tigerPositions?.length &&
          tigerPositions.map((p, index) =>{ 
            console.log(p)
            return(
            <div
              key={p.name}
              onClick={() => {
                if(turn === 'tiger'){
                  setSelectedPositionFromTableGoat(null)
                  setSelectedPosition({ ...p, player: 'tiger' })
                }
              }
              }
              style={{
                top: `${p.y}px`,
                left: `${p.x}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute cursor-pointer h-[40px] w-[40px] bg-red-700 rounded-full"
            >
              <Image src="/tiger.png" alt="tiger" width={40} height={40} />
            </div>
          )})}

      </div>

      <div className="absolute top-5 right-5 w-[300px] h-[80px] border-2 border-white flex items-center justify-center">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className=" border-2 bg-green-700 h-[40px] w-[40px]  border-white rounded-full">
                  <Image src="/goat.png" alt="tiger" width={40} height={40} />

                  </div>
                  <p className="text-white">Goat</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className=" border-2 bg-red-700 h-[40px] w-[40px] border-white rounded-full">
              <Image src="/tiger.png" alt="tiger" width={40} height={40} />

                  </div>
                  <p className="text-white">Tiger</p>
                </div>
            </div>
      </div>

      <div className="absolute bottom-5 right-5 w-[300px] gap-2 p-2 border-2 border-white flex items-center flex-wrap" >
          {
            totalGoats.map((p, index) => (
              <div
              key={p.name}
              onClick={() => {
                if(turn === 'goat'){
                  setSelectedPosition(null);
                  setSelectedPositionFromTableGoat({ ...p, player: 'goat' })
                }
              }}
                className="cursor-pointer bg-green-700 rounded-full "
              >
                <Image src="/goat.png" alt="goat" width={40} height={40} />
              </div>
            ))
          }
      </div>

    </div>
  );
}
