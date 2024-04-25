import './App.css';
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

interface BoardProps {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}

const Board: FC<BoardProps> = ({xIsNext, squares, onPlay}) => {
  function handleClick (i: number) {
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  
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
const Game: FC = () =>{
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const currentSquares = history[history.length - 1];
   
    function handlePlay(nextSquares: any[]): void{
      setHistory([...history, nextSquares]);
      setXIsNext(!xIsNext);
    }
    function jumpTo(nextMove: number): void {
      setCurrentMove(nextMove);
      setXIsNext(nextMove % 2 === 0)
    }
    const moves: JSX.Element[] = history.map((squares: any[], move: number) => {
      let description: string;
      if (move > 0) {
        description = 'Go to move #' + move;
      }else {
        description = 'Go to start';
      }
      return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
      )
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
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


export default Game;


