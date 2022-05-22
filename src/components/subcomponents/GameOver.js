import React from "react";

function GameOver({ mainMenuPressed, playAgainPressed, setShowAudioPlayer }) {
  setShowAudioPlayer(false);
  return (
    <>
      <div className={"title"}>YOU FELL TO YOUR DEATH!</div>
      <button
        onClick={mainMenuPressed}
        className="gameOptions__button  extraTopMargin"
      >
        Main Menu
      </button>
      <button onClick={playAgainPressed} className="gameOptions__button">
        Try Again
      </button>
      <div className={"title extraTopMargin"}>GAME OVER</div>
    </>
  );
}

export default GameOver;
