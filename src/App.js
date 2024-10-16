import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TicTacToe from './components/TicTacToe';
import SassySnake from './components/SassySnake';
import CrazzieCabie from './components/CrazzieCabie';

import './styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/tic-tac-toe">Tic Tac Toe</Link>
          <Link to="/sassy-snake">Sassy Snake</Link>
          <Link to="/crazzie-cabie">Crazzie Cabie</Link>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/sassy-snake" element={<SassySnake />} />
          <Route path="/crazzie-cabie" element={<CrazzieCabie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
