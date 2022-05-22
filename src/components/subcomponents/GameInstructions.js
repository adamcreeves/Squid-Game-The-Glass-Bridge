import React from "react";
import { c030, c031, c032 } from "../../resources/ClassNames";
import { s032, s033, s034 } from "../../resources/Strings";

function GameInstructions({ player, toggleInstructions, setShowAudioPlayer }) {
  setShowAudioPlayer(false);
  return (
    <div className={c030}>
      <div className={c031}>{s032 + player + s033}</div>
      <button onClick={toggleInstructions} className={c032}>
        {s034}
      </button>
    </div>
  );
}

export default GameInstructions;
