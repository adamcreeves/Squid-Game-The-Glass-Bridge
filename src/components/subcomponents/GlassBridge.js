import React from "react";
import { c038, c039 } from "../../resources/ClassNames";
import { s030, s031 } from "../../resources/Strings";
import { renderAllRows } from "../../utils";

function GlassBridge({
  numberOfRows,
  answers,
  extraLives,
  setExtraLives,
  playersMoveCount,
  setPlayersMoveCount,
  wrongTileSelected,
  setWrongTileSelected,
  correctMovesMade,
  setCorrectMovesMade,
  setGameWon,
  playerProfile,
}) {
  const playerWonGame =
    answers.length === playersMoveCount &&
    correctMovesMade[playersMoveCount - 1];

  if (playerWonGame) {
    setGameWon(true);
  }

  return (
    <div className={c038}>
      <div className={c039}>{s030}</div>
      {renderAllRows(
        numberOfRows,
        answers,
        playerProfile,
        playersMoveCount,
        correctMovesMade,
        wrongTileSelected,
        setPlayersMoveCount,
        setCorrectMovesMade,
        setWrongTileSelected,
        extraLives,
        setExtraLives
      )}
      <div className={c039}>{s031}</div>
    </div>
  );
}

export default GlassBridge;
