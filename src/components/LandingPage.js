

import React from 'react';
import '../styles.css';
import ticTacToeImage from '../assets/tic-tac-toe.jpg'; // Replace with actual path to your images
import sassySnakeImage from '../assets/sassy-snake.jpg';
import crazzieCabieImage from '../assets/crazzie-cabie.jpg';

const LandingPage = () => {
  const games = [
    {
      name: 'Tic Tac Toe',
      description: 'A classic game where two players take turns marking spaces in a 3x3 grid.',
      image: ticTacToeImage,
      link: '/tic-tac-toe',
    },
    {
      name: 'Sassy Snake',
      description: 'Guide the snake to eat the apples and grow in size without hitting the walls!',
      image: sassySnakeImage,
      link: '/sassy-snake',
    },
    {
      name: 'Crazzie Cabie',
      description: 'Drive the car as long as possible without crashing into other vehicles on the road!',
      image: crazzieCabieImage,
      link: '/crazzie-cabie',
    },
  ];

  return (
    <div className="landing-page">
      <h1>Welcome to the Game Hub!</h1>
      <div className="game-cards">
        {games.map((game, index) => (
          <div key={index} className="game-card">
            <img src={game.image} alt={`${game.name} Thumbnail`} className="game-image" />
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <a href={game.link} className="play-now-button">Play Now</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

