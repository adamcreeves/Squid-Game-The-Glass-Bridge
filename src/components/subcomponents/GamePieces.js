import React from "react";
import { c041 } from "../../resources/ClassNames";
import { s039 } from "../../resources/Strings";
import { gamePiecesArray } from "../../utils";

function GamePieces({ selectedGamePiece, setSelectedGamePiece }) {
  return (
    <div className="gameOptions__container">
      <div className={c041}>{s039}</div>
      <div className="gameOptions__gamePieceContainer">
        {gamePiecesArray.map((gamePiece, index) => (
          <div
            className={
              selectedGamePiece === index
                ? "gameOptions__option gameOptions__gamePieceButton selectedDifficultyOption"
                : "gameOptions__option gameOptions__gamePieceButton nonselectedDifficultyOption"
            }
            onClick={() => setSelectedGamePiece(index)}
          >
            <input
              className="gameOptions__difficultyButton"
              type="radio"
              value={selectedGamePiece}
              name="selectedGenderMale"
              checked={selectedGamePiece === index}
            />
            <img
              className="gameOptions__gamePieceImg"
              src={gamePiece}
              alt={gamePiece}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamePieces;
