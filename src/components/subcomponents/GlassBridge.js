import React from "react";
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
    <div className="glassBridge">
      <div className="glassBridge__Text">Finish</div>
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
      <div className="glassBridge__Text">Start Here</div>
    </div>
  );
}

export default GlassBridge;
