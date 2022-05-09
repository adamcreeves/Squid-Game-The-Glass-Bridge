import React from "react";
import Cookies from "universal-cookie";

function GameBody({ player, difficulty, resetGame }) {
  const cookies = new Cookies();
  const resetGamePressed = () => {
    cookies.remove("player");
    resetGame();
  };
  return (
    <div className="gameBody">
      <div className="gameBody__details">{`Good luck ${player}. Choose wisely`}</div>
      <div className="gameBody__details">{`Difficulty: ${difficulty}`}</div>
      <button onClick={resetGamePressed}>Reset</button>
    </div>
  );
}

export default GameBody;
