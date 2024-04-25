import { useState } from "react";
import Board from "./App";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState<Array<string | null>>(Array(9).fill(null));
  const currentSquares = history[history.length - 1];
  
  return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <ol>{/*TODO*/}</ol>
        </div>
      </div>
    );
  }