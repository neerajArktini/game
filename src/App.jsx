import React, { useEffect, useState } from 'react';
import "./App.css";

const App = () => {
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const colors = ["blue", 'brown', 'red', 'green', 'black'];
  const [randomIndices, setRandomIndices] = useState([]);
  const [colorName, setColorName] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const texts = ["", "Tap The", "Don't Tap The"];
  const maxRounds = 5; // Number of rounds before the game ends

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (rounds >= maxRounds) {
      setGameOver(true);
    }
  }, [rounds]);

  useEffect(() => {
    if (level > 1) {
      initializeGame();
    }
  }, [level]);

  const initializeGame = () => {
    setScore(0);
    setRounds(0);
    setGameOver(false);
    changeboxes();
  };

  const changeboxes = (clickedColor = null) => {
    const indices = new Set();
    while (indices.size < 3) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      indices.add(randomIndex);
    }
    const newIndices = Array.from(indices);
    setRandomIndices(newIndices);

    const selectedColor = colors[newIndices[Math.floor(Math.random() * newIndices.length)]];
    setColorName(selectedColor);

    if (clickedColor !== null) {
      if (level === 1) {
        if (clickedColor === colorName) {
          setScore(score + 1);
        }
      } else if (level === 2) {
        if (clickedColor !== colorName) {
          setScore(score + 1);
        }
      }
      setRounds(rounds + 1);
    }
  };

  return (
    <div className='wrap'>
      {
        randomIndices.length > 0 &&
        <div className="container">
          {gameOver ? (
            <div className='game-over'>
              <span className='t'>Game Over</span>
              <span className='score'>SCORE: {score}</span>
              {(score >= 3) && (
                <button className='next-level' onClick={() => setLevel(level + 1)}>
                  Next Level
                </button>
              )}
              <button className='try-again' onClick={initializeGame}>
                Try Again
              </button>
            </div>
          ) : (
            <>
              <p className='title'>
                {texts[level]} &nbsp;
                <span className='color-name' style={{ color: colorName }}>
                  {colorName} &nbsp;
                </span>button
              </p>
              <div className="boxes">
                {randomIndices.map((index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: colors[index] }}
                    className="box"
                    onClick={() => changeboxes(colors[index])}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>
      }
    </div>
  );
};

export default App;

