import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../styles.css';

const SassySnake = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]); // Initial snake position
  const [food, setFood] = useState({ x: 15, y: 15 }); // Initial food position
  const [direction, setDirection] = useState({ x: 1, y: 0 }); // Start moving right
  const [speed, setSpeed] = useState(200); // Initial speed of the game
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Handle keyboard input for snake direction
  const handleKeyDown = useCallback((event) => {
    switch (event.keyCode) {
      case 37: // Left arrow
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 38: // Up arrow
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 39: // Right arrow
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      case 40: // Down arrow
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      default:
        break;
    }
  }, [direction]);

  // Function to start or restart the game
  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(randomFoodPosition());
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setSpeed(200);
    setGameOver(false);
    document.body.classList.remove('game-over-background'); // Remove the game-over background when the game restarts
  };

  // Random food position generator
  const randomFoodPosition = () => {
    const min = 1;
    const max = 29; // Assuming grid size is 30x30
    const x = Math.floor((Math.random() * (max - min + 1) + min));
    const y = Math.floor((Math.random() * (max - min + 1) + min));
    return { x, y };
  };

  // Main game loop for movement and collision detection
  useEffect(() => {
    if (gameOver) {
      const playAgain = window.confirm('Game Over! Do you want to play again?');
      if (playAgain) {
        startGame();
      }
      return; // Exit the effect if the game is over
    }

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        // Collision detection with walls or itself
        if (
          head.x < 0 ||
          head.x >= 30 ||
          head.y < 0 ||
          head.y >= 30 ||
          newSnake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          document.body.classList.add('game-over-background'); // Change background to jungleee image on game over
          clearInterval(gameInterval);
          return prevSnake;
        }

        // Check if the snake eats the food
        if (head.x === food.x && head.y === food.y) {
          newSnake.unshift(head); // Grow the snake
          setFood(randomFoodPosition());
          setScore(prevScore => prevScore + 10);
          setSpeed(prevSpeed => prevSpeed * 0.95); // Increase speed
        } else {
          newSnake.pop(); // Remove the last segment
          newSnake.unshift(head); // Move the snake
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, speed]);

  // Event listener for keyboard input
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Draw the snake game on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#228B22'; // Green background color for the canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas background

    // Draw the snake
    ctx.fillStyle = '#006400';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    // Draw the food
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
  }, [snake, food]);

  return (
    <div className="snake-game">
      <h1>Sassy Snake</h1>
      <p className="score-display">Score: {score}</p>
      <canvas ref={canvasRef} width="600" height="600" className="snake-canvas"></canvas>
    </div>
  );
};

export default SassySnake;
