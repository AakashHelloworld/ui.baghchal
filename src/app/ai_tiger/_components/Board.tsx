"use client";

import { useState, useEffect, use } from "react";
import { goatRules, tigerRules } from "@/lib/rules";
import { Position, SelectedPosition } from "@/types/Board";
import { validPositions } from "@/lib/validPosition";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { SoundToggler } from "@/app/game/_components/soundToggler";
import { useSound } from "@/context/SoundContext";

export default function Board() {
  const [loading, setLoading] = useState(false);
  const { playClick } = useSound();

  const [board, setBoard] = useState<number[][]>([
    [-1, 0, 0, 0, -1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [-1, 0, 0, 0, -1],
  ]);
  const [turn, setTurn] = useState<"goat" | "tiger">("goat");

  const [winner, setWinner] = useState<string | null>(null);

  const [totalGoats, setTotalGoats] = useState(20);

  const [capturedGoats, setCapturedGoats] = useState(0);

  const [tigerPositions, setTigerPositions] = useState<any[]>([
    [0, 0],
    [0, 4],
    [4, 0],
    [4, 4],
  ]);

  const [tigerBlocked, setTigerBlocked] = useState(0);

  function available_position(
    selectedPosition: any | null,
    board: number[][],
    turn: "tiger" | "goat"
  ) {
    if (selectedPosition === null) {
      return [];
    }

    let directions = [];

    if ((selectedPosition.x + selectedPosition.y) % 2 != 0) {
      directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
    } else {
      directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [1, 1],
        [-1, 1],
        [1, -1],
      ];
    }
    let move: any = [];
    directions.map(([dx, dy]) => {
      const x = selectedPosition.x + dx;
      const y = selectedPosition.y + dy;
      if (x >= 0 && x < 5 && y >= 0 && y < 5 && board[x][y] === 0) {
        move.push([
          [selectedPosition.x, selectedPosition.y],
          [x, y],
        ]);
      }
      if (turn == "tiger") {
        const jumx = selectedPosition.x + 2 * dx;
        const jumy = selectedPosition.y + 2 * dy;
        if (
          jumx >= 0 &&
          jumx < 5 &&
          jumy >= 0 &&
          jumy < 5 &&
          board[jumx][jumy] === 0 &&
          board[x][y] === 1
        ) {
          move.push([
            [selectedPosition.x, selectedPosition.y],
            [jumx, jumy],
          ]);
        }
      }
    });

    return move;
  }
  const [selectedPosition, setSelectedPosition] = useState<any | null>(null);

  useEffect(() => {
    if (capturedGoats >= 5) {
      alert("Tiger Wins");
      setBoard([
        [-1, 0, 0, 0, -1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [-1, 0, 0, 0, -1],
      ]);
      setTurn("goat");
      setTotalGoats(20);
      setCapturedGoats(0);
    } else {
      let flag = true;
      let tigerBlocked_now = 0;
      console.log("Tiger Positions", tigerPositions);
      tigerPositions.map(([x, y]) => {
        let position = available_position(
          { x, y, name: "tiger" },
          board,
          "tiger"
        );
        if (position.length > 0) {
          flag = false;
        } else {
          tigerBlocked_now = tigerBlocked_now + 1;
        }
      });

      console.log("Tiger Blocked", tigerBlocked_now);
      setTigerBlocked(tigerBlocked_now);

      if (flag) {
        alert("Goat Wins");
        setBoard([
          [-1, 0, 0, 0, -1],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [-1, 0, 0, 0, -1],
        ]);
        setTurn("goat");
        setTotalGoats(20);
        setCapturedGoats(0);
      }
    }
  }, [capturedGoats, board, tigerPositions, selectedPosition]);

  const updateBoard = (x1: number, y1: number, x2: number, y2: number) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[x1][y1] = 0; // Move tiger
      newBoard[x2][y2] = -1; // Place tiger at new position

      // Handle jumping and goat removal
      if (Math.abs(x2 - x1) === 2 || Math.abs(y2 - y1) === 2) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        if (newBoard[midX][midY] === 1) {
          // If there is a goat in the middle
          newBoard[midX][midY] = 0; // Remove the goat
          setCapturedGoats((prevCapturedGoats) => prevCapturedGoats + 1); // Increase captured goats count
        }
      }

      return newBoard;
    });

    setTigerPositions((prev) =>
      prev.map(([x, y]) => (x === x1 && y === y1 ? [x2, y2] : [x, y]))
    );

    setTurn("goat");
  };

  const getBestMove = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/get_moves_tiger",
        {
          board: board,
          tigers: tigerPositions,
          total_goats: totalGoats,
          goats_on_board: 20 - totalGoats, // Goats already placed
          capture_goat: capturedGoats,
          turn: turn,
        }
      );

      if (response.data.moves.length > 0) {
        console.log("Best move from AI:", response.data.moves);
        const [[x1, y1], [x2, y2]] = response.data.moves; // Get the best move
        updateBoard(x1, y1, x2, y2);
      }
    } catch (error) {
      console.error("Error fetching AI move:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (turn === "tiger") {
      getBestMove();
    }
  }, [turn]);

  return (
    <div className="w-full relative h-screen bg-[#143034] flex items-center justify-center p-4 bg-[url(/layout.jpg)] bg-no-repeat bg-center bg-cover">
      <div className="relative h-[500px] w-[500px] border-2 border-white grid grid-cols-4 grid-rows-4 -translate-x-10 translate-y-10">
        {/* Grid cells */}
        {Array.from({ length: 16 }).map((_, idx) => (
          <div
            key={idx}
            className="border-2 border-white"
          ></div>
        ))}

        {/* Diagonal and diamond lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
        >
          {/* Outer diagonals */}
          <line
            x1="0"
            y1="0"
            x2="500"
            y2="500"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="500"
            y1="0"
            x2="0"
            y2="500"
            stroke="white"
            strokeWidth="2"
          />

          {/* Inner diagonals for smaller squares */}
          <line
            x1="0"
            y1="250"
            x2="250"
            y2="500"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="250"
            y1="0"
            x2="500"
            y2="250"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="250"
            y1="0"
            x2="0"
            y2="250"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="500"
            y1="250"
            x2="250"
            y2="500"
            stroke="white"
            strokeWidth="2"
          />
        </svg>

        {Array.from({ length: 5 }).map((_, i) => {
          return Array.from({ length: 5 }).map((_, j) => {
            const positions = available_position(selectedPosition, board, turn);
            const available_position_fornow = positions.map(
              ([[x, y], [nx, ny]]: any) => {
                return [nx, ny];
              }
            );

            return (
              <div
                key={j}
                style={{ top: `${i * 125}px`, left: `${j * 125}px` }}
                className="absolute transform opacity-100 translate-x-[-50%] translate-y-[-50%] bg-white h-[65px] w-[65px] rounded-full flex items-center justify-center"
              >
                {board[i][j] === -1 && (
                  <div className="absolute cursor-pointer h-[60px] w-[60px] bg-red-700 rounded-full">
                    <Image
                      src="/tiger.png"
                      alt="tiger"
                      width={60}
                      height={60}
                    />
                  </div>
                )}
                {board[i][j] === 1 && (
                  <div
                    className="absolute cursor-pointer h-[60px] w-[60px] bg-green-700 rounded-full p-1"
                    onClick={() => {
                      if (turn === "goat" && totalGoats <= 0) {
                        setSelectedPosition({ x: i, y: j, name: "goat" });
                      }
                    }}
                  >
                    <Image
                      src="/goat.png"
                      alt="goat"
                      width={60}
                      height={60}
                    />
                  </div>
                )}

                {board[i][j] === 0 && (
                  <div
                    className={`absolute cursor-pointer h-[60px] w-[60px] rounded-full ${
                      available_position_fornow.some(
                        ([x, y]: any) => x === i && y === j
                      )
                        ? "border-2 border-[#30833f] bg-[#30833f]/50"
                        : ""
                    }`}
                    onClick={() => {
                      if (turn === "goat") {
                        if (totalGoats > 0) {
                          setBoard((prevBoard) => {
                            const newBoard = [...prevBoard];
                            newBoard[i][j] = 1;
                            return newBoard;
                          });
                          setTotalGoats((prevTotalGoats) => prevTotalGoats - 1);
                          setTurn("tiger");
                        } else {
                          if (selectedPosition != null) {
                            const find = positions.find(
                              ([[x, y], [nx, ny]]: any) => nx === i && ny === j
                            );
                            if (find?.length) {
                              const source = find![0];
                              const destination = find![1];

                              setBoard((prevBoard) => {
                                const newBoard = [...prevBoard];
                                newBoard[source[0]][source[1]] = 0;
                                newBoard[destination[0]][destination[1]] = 1;
                                return newBoard;
                              });

                              setTurn("tiger");
                              setSelectedPosition(null);
                            }
                          }
                        }
                      }
                    }}
                  ></div>
                )}
              </div>
            );
          });
        })}
      </div>

      <div className="absolute top-5 right-5 w-[22rem] h-[10rem] flex items-center bg-[url(/inf.png)]  bg-center bg-cover justify-center">
        <div className="flex items-center gap-4 mt-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl text-[black]">Tiger Blocked</p>
            <p className="text-xl text-[black]">{tigerBlocked}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl text-[black]">Goat Eaten</p>
            <p className="text-xl text-[black]">{capturedGoats}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 w-[22rem] h-[10rem] flex items-center bg-[url(/detail.png)]  bg-center bg-cover justify-center">
        <div className="flex items-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className=" border-2 bg-green-700 h-[50px] w-[50px]  border-white rounded-full">
              <Image
                src="/goat.png"
                alt="tiger"
                width={50}
                height={50}
              />
            </div>
            <p className="text-xl text-[black]">Goat</p>
          </div>
          <div className="flex items-center gap-2">
            <div className=" border-2 bg-red-700 h-[50px] w-[50px] border-white rounded-full">
              <Image
                src="/tiger.png"
                alt="tiger"
                width={50}
                height={50}
              />
            </div>
            <p className="text-xl text-[black]">Tiger</p>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-5 left-5 bg-[url(/audio_wooden.png)]  w-[10rem] h-[10rem] flex justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer">
        <button
          onClick={() => setMuted(!muted)}
          className="bg-transparent mt-[-1rem]"
        >
          {muted ? (
            <VolumeX
              size={44}
              color="black"
            />
          ) : (
            <Volume2
              size={44}
              color="black"
            />
          )}
        </button>
      </div> */}
      <SoundToggler />

      <Link href="/">
        <div className="absolute top-5 left-5 bg-[url(/back.png)] active:scale-90 transition-all  w-[10rem] flex h-[5rem] justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer">
          <button
            className="bg-transparent"
            onClick={() => playClick()}
          >
            <p className="text-xl text-[black]">Back</p>
          </button>
        </div>
      </Link>
      {loading && (
        <div className="absolute top-[11rem] right-[6rem] bg-[url(/wooden.png)]  w-[10rem] h-[3.5rem] flex justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer">
          <p>Ai is Thinking....</p>
        </div>
      )}
    </div>
  );
}
