import React from "react";
import Cookies from "universal-cookie";
import GlassBridge from "./GlassBridge";

function GameBody({ player, difficulty, answers, extraLives, resetGame }) {
  const cookies = new Cookies();
  const resetGamePressed = () => {
    cookies.remove("player");
    resetGame();
  };

  return (
    <div className="gameBody">
      <div className="gameBody__details">{`Good luck ${player}. Choose wisely`}</div>
      <div className="gameBody__details">{`Difficulty: ${difficulty}`}</div>
      <div className="gameBody__details">{`Answers Array: ${answers}`}</div>
      <div className="gameBody__details">{`Extra Lives: ${extraLives}`}</div>
      <button onClick={resetGamePressed}>Reset</button>
      <GlassBridge numberOfRows={answers.length} answers={answers} />
    </div>
  );
}

export default GameBody;
