"use client";

import { useState, useEffect, use } from "react";
import { goatRules, tigerRules } from "@/lib/rules";
import { Position, SelectedPosition } from "@/types/Board";
import { validPositions } from "@/lib/validPosition";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { SoundToggler } from "@/components/shared/soundToggler";
import { useSound } from "@/context/SoundContext";
import Modal from "@/components/shared/Modal";

export default function Board() {
  const [loading, setLoading] = useState(false);
  const {
    playClick,
    playTigerSound,
    playGoatSound,
    playGoatMoveSound,
    playTigerWinSound,
  } = useSound();

  const [board, setBoard] = useState<number[][]>([
    [-1, 0, 0, 0, -1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [-1, 0, 0, 0, -1],
  ]);
  const [turn, setTurn] = useState<"goat" | "tiger">("goat");

  const [totalGoats, setTotalGoats] = useState(20);

  const [capturedGoats, setCapturedGoats] = useState(0);

  const [tigerPositions, setTigerPositions] = useState<any[]>([
    [0, 0],
    [0, 4],
    [4, 0],
    [4, 4],
  ]);

  const [winner, setWinner] = useState<string | null>(null);

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
    setTimeout(() => {
      if (capturedGoats >= 5) {
        playTigerWinSound();
        setWinner("tiger_win");
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
          setWinner("goat_win");
        }
      }
    }, 1);
  }, [capturedGoats, board, tigerPositions, selectedPosition]);

  const updateBoard = (data: any) => {
    if (!data || data.length === 0) {
      return;
    }
    if (Array.isArray(data[0]) && data[0].length === 2) {
      // Case: [[2,2],[3,2]]
      const [source, destination] = data;
      setTurn("tiger");
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[source[0]][source[1]] = 0;
        newBoard[destination[0]][destination[1]] = 1;
        return newBoard;
      });
      playGoatMoveSound();
    } else if (data.length === 2 && typeof data[0] === "number") {
      const source = data;
      console.log("Source", source);
      setTurn("tiger");
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[source[0]][source[1]] = 1;
        return newBoard;
      });
      playGoatMoveSound();
      setTotalGoats((prevTotalGoats) => prevTotalGoats - 1);
    }
  };

  const getBestMove = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://baghchal-api.vercel.app/get_moves_goat",
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
        setTurn("tiger");
        console.log("Best move from AI:", response.data.moves);

        updateBoard(response.data.moves);
      }
    } catch (error) {
      console.error("Error fetching AI move:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (turn === "goat") {
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
                  <div
                    className="absolute cursor-pointer h-[60px] w-[60px] bg-red-700 rounded-full"
                    onClick={() => {
                      if (turn === "tiger") {
                        setSelectedPosition({ x: i, y: j, name: "tiger" });
                      }
                    }}
                  >
                    <Image
                      src="/tiger.png"
                      alt="tiger"
                      width={60}
                      height={60}
                    />
                  </div>
                )}
                {board[i][j] === 1 && (
                  <div className="absolute cursor-pointer h-[60px] w-[60px] bg-green-700 rounded-full p-1">
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
                      if (turn === "tiger") {
                        if (selectedPosition !== null) {
                          const find = positions.find(
                            ([[x, y], [nx, ny]]: any) => nx === i && ny === j
                          );
                          if (find?.length) {
                            const source = find![0];
                            const destination = find![1];

                            setTigerPositions((prevTigerPositions) => {
                              console.log(source, "Source");
                              console.log(destination, "Destination");
                              console.log(
                                prevTigerPositions,
                                "Prev Tiger Positions"
                              );
                              const filterTigerPositions =
                                prevTigerPositions.filter(
                                  ([x, y]: [number, number]) =>
                                    !(x === source[0] && y === source[1])
                                );

                              console.log(
                                filterTigerPositions,
                                "Filter Tiger Positions"
                              );
                              filterTigerPositions.push([
                                destination[0],
                                destination[1],
                              ]);
                              console.log(
                                filterTigerPositions,
                                "Filter Tiger Positions"
                              );
                              return filterTigerPositions;
                            });
                            let khayo = false;

                            if (
                              Math.abs(source[0] - destination[0]) === 2 ||
                              Math.abs(source[1] - destination[1]) === 2
                            ) {
                              const jumx = (source[0] + destination[0]) / 2;
                              const jumy = (source[1] + destination[1]) / 2;
                              if (board[jumx][jumy] === 1) {
                                khayo = true;
                                setCapturedGoats(
                                  (prevCapturedGoats) => prevCapturedGoats + 1
                                );
                              }
                            }

                            if (khayo == true) {
                              playGoatSound();
                            } else {
                              playTigerSound();
                            }
                            khayo = false;

                            setBoard((prevBoard) => {
                              const newBoard = [...prevBoard];
                              newBoard[source[0]][source[1]] = 0;
                              newBoard[destination[0]][destination[1]] = -1;

                              if (
                                Math.abs(source[0] - destination[0]) === 2 ||
                                Math.abs(source[1] - destination[1]) === 2
                              ) {
                                const jumx = (source[0] + destination[0]) / 2;
                                const jumy = (source[1] + destination[1]) / 2;
                                if (board[jumx][jumy] === 1) {
                                  newBoard[jumx][jumy] = 0;
                                }
                              }
                              return newBoard;
                            });

                            setSelectedPosition(null);
                            setTurn("goat");
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

      <div className="absolute top-5 right-5 w-[22rem] h-[10rem] flex flex-col  bg-[url(/inf.png)]  bg-center bg-cover">
        <div className="w-full flex justify-center gap-4 mt-6">
          <div className="flex items-center gap-[4rem] mt-6 ">
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src={"/tigercross.png"}
                  alt="tiger"
                  width={40}
                  height={40}
                />
              </div>
              <p className="text-xl text-[black] font-semibold ">
                {tigerBlocked}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src={"/goatcross.png"}
                  alt="tiger"
                  width={40}
                  height={40}
                />
              </div>
              <p className="text-xl text-[black] font-semibold">
                {capturedGoats}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[76%] flex justify-end gap-2 mt-2">
          <Image
            src="/goat.png"
            alt="tiger"
            width={35}
            height={35}
          />{" "}
          <span className="text-xl font-semibold">{20 - totalGoats}</span>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 w-[17rem] h-[6rem] flex items-center bg-[url(/detail.png)]  bg-center bg-cover justify-center">
        <div className="flex items-center gap-8 mt-6">
          {turn === "goat" ? (
            <div className="flex items-center gap-2 mb-4">
              <div className=" border-2 bg-green-700 h-[50px] w-[50px]  border-white rounded-full">
                <Image
                  src="/goat.png"
                  alt="tiger"
                  width={50}
                  height={50}
                />
              </div>
              <p className="text-xl text-[black] font-bold">Goat</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-4">
              <div className=" border-2 bg-red-700 h-[50px] w-[50px] border-white rounded-full">
                <Image
                  src="/tiger.png"
                  alt="tiger"
                  width={50}
                  height={50}
                />
              </div>
              <p className="text-xl text-[black] font-bold">Tiger</p>
            </div>
          )}
        </div>
      </div>

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
        <div className="absolute top-5 left-1/2 translate-x-[-50%] bg-[url(/wooden.png)]  w-[10rem] h-[3.5rem] flex justify-center items-center bg-center bg-cover p-3 rounded-full cursor-pointer">
          <p className="text-[black] font-bold">AI is Thinking....</p>
        </div>
      )}

      {(winner == "tiger_win" || winner == "goat_win") && (
        <div className="h-[100vh] w-[100vw]  absolute top-0 left-0 bg-black opacity-60 flex justify-center pt-[2rem] "></div>
      )}

      {(winner == "tiger_win" || winner == "goat_win") && (
        <div className="absolute w-[22vw] pb-5 top-[3rem] left-1/2 translate-x-[-50%] bg-[#143034] z-[100] flex flex-col items-center">
          <div className="mt-2  flex items-center">
            <p className="text-2xl text-[white] font-bold">
              {winner == "tiger_win" ? "Bot Won" : "PLayer Won"}
            </p>
          </div>

          <div className="mt-2 flex items-center  gap-2 mt-2">
            <div>
              <div
                className={`h-[6rem] w-[6rem] rounded flex justify-center items-center bg-[#fff] ${
                  winner == "tiger_win"
                    ? "border border-4 border-[#317f41]"
                    : "border border-4 border-[red]"
                }`}
              >
                <Image
                  src="/tiger.png"
                  alt="tiger"
                  width={50}
                  height={50}
                />
              </div>
              <div className="w-full flex justify-center">
                <p className="text-md text-[white] font-bold">Bot</p>
              </div>
            </div>
            <div>
              <p className="text-xl text-[white] font-bold">vs</p>
            </div>
            <div>
              <div
                className={`h-[6rem] w-[6rem] rounded flex justify-center items-center bg-[#fff] ${
                  winner != "tiger_win"
                    ? "border border-4 border-[#317f41]"
                    : "border border-4 border-[red]"
                }`}
              >
                <Image
                  src="/goat.png"
                  alt="tiger"
                  width={50}
                  height={50}
                />
              </div>
              <div className="w-full flex justify-center">
                <p className="text-md text-[white] font-bold">Player</p>
              </div>
            </div>
          </div>

          {/* <div className="mt-2 flex items-center justify-center gap-4 mt-2 h-[4rem] w-[90%]">
                <p className="text-4xl text-[white] font-bold">755</p>
                <p className="text-xl text-[red] font-semibold">-11</p>
              </div> */}

          <div className="mt-2 flex items-center justify-center gap-4 mt-2 h-[3rem] w-[90%]">
            <button
              onClick={() => window.location.reload()}
              className="w-[40%] h-[100%] bg-[#317f41] flex justify-center items-center font-bold text-white rounded-[.5rem]"
            >
              Rematch
            </button>
            <button className="w-[40%] h-[100%] bg-[#317f41] flex justify-center items-center  rounded-[.5rem]">
              <Link href={"/"}>
                <p className="font-bold text-white">Home</p>
              </Link>
            </button>
          </div>

          <div className="h-[5rem] w-[22vw] absolute top-[-5] left-0 bg-[black]/70 z-[-1] "></div>
        </div>
      )}
    </div>
  );
}
