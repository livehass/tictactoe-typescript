import './App.css';
import './Reset.css'
import React, { FC, useState } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: ()=> void;
}

const Square: FC<SquareProps> = ({ value , onSquareClick}) => {
  return (
    <button className="square" onClick={onSquareClick}>
    {value}
    </button>
  );  
}

const Board: FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
 
  const handleClick = (i: number): void => {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if(nextSquares[i]) {
      console.log("o quadrado já está preenchido com o" + nextSquares[i]);
      return;
    }
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  
    
  }
  const winner = calculateWinner(squares);
    let status: string;
    if(winner) {
      status = "Winner:" + winner;
      console.log(status)
    }else {
      status = "Next player:"  + (xIsNext ? 'X' : 'O');
      console.log(status)
    }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}
function calculateWinner(squares: any[]): string | null {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i: number = 0; i < lines.length; i++) {
    const [a, b, c]: number[] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;