import React from "react";

function GameInstructions({ player, toggleInstructions, setShowAudioPlayer }) {
  setShowAudioPlayer(false);
  return (
    <div className="gameBody instructionsContainer">
      <div className="gameBody__details">{`To win the game you must cross the glass bridge. 
        As you move, you must choose the left or right path. If you choose correctly, the 
        glass tile will hold your weight (tile turns green) and you can continue to cross. 
        If you choose wrong, the glass tile will break (tile turns red and you start back at 
        the beginning). If you run out of lives, you will fall to your death and the game is 
        over. Start at the bottom row. Good luck ${player}!`}</div>
      <button
        onClick={toggleInstructions}
        className="gameBody__button extraTopMargin"
      >
        Back to the Game
      </button>
    </div>
  );
}

export default GameInstructions;
