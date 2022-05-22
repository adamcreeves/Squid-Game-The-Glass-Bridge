import React from "react";
import { c013 } from "../../resources/ClassNames";

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
      <div className={"title extraTopMargin"}>{`${player}!`}</div>
      <button
        onClick={mainMenuPressed}
        className="gameOptions__button extraTopMargin"
      >
        Main Menu
      </button>
      <button
        onClick={playAgainPressed}
        className="gameOptions__button extraTopMargin"
      >
        Play Again
      </button>
      <div
        className={"title extraTopMargin"}
      >{`on ${displayedDifficulty}`}</div>
    </>
  );
}

export default GameWon;
