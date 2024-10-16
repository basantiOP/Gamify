import React, { useState, useEffect } from 'react';
import '../styles.css'; // Assuming this contains common styles

const CrazzieCabie = () => {
  const [gridSize, setGridSize] = useState(2); // Initial grid size 2x2
  const [oddBoxIndex, setOddBoxIndex] = useState(null); // Index of the odd box
  const [colors, setColors] = useState([]); // Stores color values for the boxes
  const [level, setLevel] = useState(1); // Keeps track of the current level

  // Function to generate random color
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Generate a slightly different color for the odd box
  const slightlyDifferentColor = (color) => {
    let [r, g, b] = color.match(/\d+/g).map(Number);
    const diff = 25;
    r = (r + diff) % 256;
    g = (g + diff) % 256;
    b = (b + diff) % 256;
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Initialize the grid with colors
  const initializeGrid = () => {
    const baseColor = randomColor(); // Base color for all boxes
    const oddColor = slightlyDifferentColor(baseColor); // Odd box color

    // Create array of base colors, with one odd box
    const colorArray = Array(gridSize * gridSize).fill(baseColor);
    const oddIndex = Math.floor(Math.random() * colorArray.length); // Randomly choose one box
    colorArray[oddIndex] = oddColor; // Set the odd box color

    setOddBoxIndex(oddIndex);
    setColors(colorArray);
  };

  // Handle box click
  const handleBoxClick = (index) => {
    if (index === oddBoxIndex) {
      // Correct box clicked, move to next level
      setGridSize(gridSize + 1);
      setLevel(level + 1);
      initializeGrid();
    } else {
      // Wrong box clicked, reset game
      alert('Game Over! Try again.');
      resetGame();
    }
  };

  // Reset the game to the initial state
  const resetGame = () => {
    setGridSize(2);
    setLevel(1);
    initializeGrid();
  };

  useEffect(() => {
    initializeGrid(); // Initialize the grid when the component mounts
  }, [gridSize]);

  return (
    <div className="game-container">
      <h1>Odd One Out (Crazie Cabie)</h1>
      <p>Level: {level}</p>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            className="grid-box"
            style={{ backgroundColor: color }}
            onClick={() => handleBoxClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CrazzieCabie;
