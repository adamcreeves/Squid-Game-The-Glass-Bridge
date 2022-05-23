import React from "react";
import { c013, c018, c047, c048 } from "../../resources/ClassNames";
import { s008, s047, s048, s049 } from "../../resources/Strings";

function GameOver({ mainMenuPressed, playAgainPressed, setShowAudioPlayer }) {
  setShowAudioPlayer(false);
  return (
    <>
      <div className={c013}>{s047}</div>
      <button onClick={mainMenuPressed} className={c047}>
        {s008}
      </button>
      <button onClick={playAgainPressed} className={c018}>
        {s048}
      </button>
      <div className={c048}>{s049}</div>
    </>
  );
}

export default GameOver;
