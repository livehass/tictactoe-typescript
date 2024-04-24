import logo from './logo.svg';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import './Reset.css'
import { title } from 'process';
import App from './App';


import React, { FC, useState } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: ()=> void;
}

const Square: FC<SquareProps> = ({ value , onSquareClick}) => {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

const Board: FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = (i: number): void => {
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);

    if(xIsNext) {
      nextSquares[i] = 'x'
    }else {
      nextSquares[i] = 'O'
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }
  return (
    <>
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

export default Board;