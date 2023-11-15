import React, { useState } from "react";

type Position = null | "X" | "O";
type Grid = [[Position, Position, Position], [Position, Position, Position], [Position, Position, Position]]


export const App = () => {  
  const [currentPlayer, setCurrentPlayer] = useState<Position>("X")
  const [winner, setWinner] = useState<Position>(null)
  const [grid, setGrid] = useState<Grid>([
    [null, null, null], 
    [null, null, null], 
    [null, null, null]
  ]);

 const handleButtonClick = (row: number, col: number) => {
    if (grid[row][col] === null) {
      const newGrid: Grid = grid.map((r) => [...r]);
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);
      if (checkWinner(newGrid, currentPlayer)) {
        setWinner(currentPlayer);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };
  
  const handleReset = () => {
    setCurrentPlayer("X")
    setGrid([[null, null, null], [null, null, null], [null, null, null]])
    setWinner(null)

  }

  const checkWinner = (currentGrid: Grid, player: "X" | "O"): boolean => {
    for (let i = 0; i < 3; i++) {
      if (currentGrid[i][0] === player && currentGrid[i][1] === player && currentGrid[i][2] === player) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (currentGrid[0][i] === player && currentGrid[1][i] === player && currentGrid[2][i] === player) {
        return true;
      }
    }

    if (
      (currentGrid[0][0] === player && currentGrid[1][1] === player && currentGrid[2][2] === player) ||
      (currentGrid[0][2] === player && currentGrid[1][1] === player && currentGrid[2][0] === player)
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="flex flex-col justify-center p-8 items-center lg:px-96">
      <h1 className="text-center font-extrabold text-[#9C96FD]  text-2xl">Tic Tac Toe</h1>
      {winner ? (
        <p className="text-sm">Winner: {winner}</p>
      ) : (
        <p className="text-sm">Current Player: {currentPlayer}</p>
      )}
      <div className="grid w-full grid-cols-3 gap-1 bg-[#9C96FD]   my-5">
        {grid.map((line, rowIndex) => {
          return line.map((position, colIndex) => {
            return (
              <button
                key={`position-${rowIndex}-${colIndex}`}
                className="bg-white w-full h-20 font-extrabold text-[#2f2b7a]"
                onClick={() => handleButtonClick(rowIndex, colIndex)}
              >
                  {position} 
              </button>
            );
          });
        })}
      </div>
      <button  onClick={handleReset} className="border-[#9C96FD] text-[#9C96FD] font-bold border w-fit rounded-md px-10 hover:bg-[#9C96FD]/25 transition-colors">reset</button>
    </div>
  )
};
