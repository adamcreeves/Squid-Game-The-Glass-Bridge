import React from "react";
import { c013, c048, c060 } from "../../resources/ClassNames";
import { s008, s033, s058, s059, s060 } from "../../resources/Strings";

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
      <div className={c013}>{s058}</div>
      <div className={c048}>{player + s033}</div>
      <button onClick={mainMenuPressed} className={c060}>
        {s008}
      </button>
      <button onClick={playAgainPressed} className={c060}>
        {s060}
      </button>
      <div className={c048}>{s059 + displayedDifficulty}</div>
    </>
  );
}

export default GameWon;
