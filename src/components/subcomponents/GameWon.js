import React from "react";
import { c013, c048 } from "../../resources/ClassNames";
import { s008 } from "../../resources/Strings";

function GameWon({
  player,
  mainMenuPressed,
  playAgainPressed,
  displayedDifficulty,
  setShowAudioPlayer,
}) {
  setShowAudioPlayer(false);
  return (
    <>
      <div className={c013}>{`YOU WON THE SQUID GAME`}</div>
      <div className={c048}>{`${player}!`}</div>
      <button
        onClick={mainMenuPressed}
        className="gameOptions__button extraTopMargin"
      >
        {s008}
      </button>
      <button
        onClick={playAgainPressed}
        className="gameOptions__button extraTopMargin"
      >
        Play Again
      </button>
      <div className={c048}>{`on ${displayedDifficulty}`}</div>
    </>
  );
}

export default GameWon;
