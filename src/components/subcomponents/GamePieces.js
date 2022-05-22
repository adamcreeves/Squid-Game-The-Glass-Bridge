import React from "react";
import { gamePiecesArray } from "../../utils";

function GamePieces({ selectedGamePiece, setSelectedGamePiece }) {
  return (
    <div className="gameOptions__container">
      <div className="whiteTitle centerText">Game pieces</div>
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
