import React, { useState } from 'react';
import '../styles.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [isXTurn, setIsXTurn] = useState(true);
  const [message, setMessage] = useState('Player X Turn');
  const [gameOver, setGameOver] = useState(false);

  const checkWinCondition = (newBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setGameOver(true);
        const winner = newBoard[a];
        setMessage(`Player ${winner} won! Player ${winner === 'X' ? 'O' : 'X'}, you lose.`);
        alert(`Player ${winner} won! Player ${winner === 'X' ? 'O' : 'X'}, better luck next time.`);
        resetGame(); // Automatically reset the game after displaying the message
        return true;
      }
    }

    if (!newBoard.includes('')) {
      setGameOver(true);
      setMessage('Match Tie. Try again!');
      alert('It\'s a Tie!');
      resetGame(); // Automatically reset the game in case of a tie
      return true;
    }

    return false;
  };

  const handleBoxClick = (index) => {
    if (board[index] !== '' || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    if (!checkWinCondition(newBoard)) {
      setMessage(`Player ${isXTurn ? 'O' : 'X'} Turn`);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsXTurn(true);
    setMessage('Player X Turn');
    setGameOver(false);
  };

  return (
    <div className="main">
      <h1>TIC TAC TOE</h1>
      <p id="ins">
        Game starts by just tapping on a box.
        <br />
        First Player starts as <b>Player X</b>
        <br />
        Second Player as <b>Player O</b>
      </p>
      <div className="board">
        {board.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            readOnly
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </div>
      <button id="reset" onClick={resetGame}>RESET</button>
      <p id="print">{message}</p>
    </div>
  );
};

export default TicTacToe;
