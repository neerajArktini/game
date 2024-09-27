import React, { useEffect, useState } from 'react';
import "./App.css";
import { gamesLevel } from './data';

const App = () => {
  const [level, setLevel] = useState(0);
  const [index, setIndex] = useState(0);
  const [boxColors, setBoxColors] = useState([]);

  const colors = ["blue", 'brown', 'red', 'green', 'black'];

  // Function to generate 3 box colors (first from answer, then from colorText/textColor, and finally random if needed)
  const generateRandomColors = () => {
    const correctAnswer = gamesLevel[level][index].answer;
    const colorText = gamesLevel[level][index].colorText;
    const textColor = gamesLevel[level][index].textColor;

    const selectedColors = new Set();

    // 1. Add all colors from the answer field
    correctAnswer.forEach((color) => selectedColors.add(color));

    // 2. Add the colorText and textColor if not already in the selected colors
    if (!selectedColors.has(colorText)) selectedColors.add(colorText);
    if (!selectedColors.has(textColor)) selectedColors.add(textColor);

    // 3. If still fewer than 3 colors, add random colors
    while (selectedColors.size < 3) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];

      // Ensure the random color isn't already in the set
      selectedColors.add(randomColor);
    }

    // Update the state with the selected box colors
    setBoxColors(Array.from(selectedColors));
  };

  // useEffect to set up the colors on initial render or when level/index changes
  useEffect(() => {
    generateRandomColors();
  }, [level, index]);

  // Function to move to the next index or level
  const handleBoxClick = (clickedColor) => {
    const correctAnswer = gamesLevel[level][index].answer;
    
      // Move to the next index or level
      if (index < gamesLevel[level].length - 1) {
        setIndex(index + 1);
      } else if (level < gamesLevel.length - 1) {
        setLevel(level + 1);
        setIndex(0);  // Reset index for new level
      } else {
        alert("You've completed all levels!");
      }
  };

  return (
    <div className='wrap'>
      <div className="container">
        <p className='title'>
          Level {level + 1}: {gamesLevel[level][index].commonText}{" "}
          <span style={{ color: gamesLevel[level][index].textColor }}>
            {gamesLevel[level][index].colorText}
          </span>
        </p>
        <div className="boxes">
          {boxColors.map((c, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: c }}
              className="box"
              onClick={() => handleBoxClick(c)}  // Move to next step on click
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;




