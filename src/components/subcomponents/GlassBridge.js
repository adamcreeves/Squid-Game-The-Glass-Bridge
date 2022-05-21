import React from "react";
import { FaSkullCrossbones } from "react-icons/fa";
import { gamePiecesArray } from "../../utils";

function GlassBridge({
  numberOfRows,
  playerGenderMale,
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
  const buttonDisabled = () => null;

  if (
    answers.length === playersMoveCount &&
    correctMovesMade[playersMoveCount - 1]
  ) {
    setGameWon(true);
  }

  const getGamePieceSource = (index) => gamePiecesArray[index];

  const renderRow = (correctTile, key) => {
    const correctMove = key + 1 === playersMoveCount && correctMovesMade[key];
    const wrongMove =
      key + 1 === playersMoveCount && correctMovesMade[key] === false;
    return (
      <div className="glassBridge__row">
        {correctTile === 0 ? (
          <>
            <button
              className={
                correctMove
                  ? "glassBridge__tile tileCorrect"
                  : "glassBridge__tile"
              }
              onClick={
                wrongTileSelected
                  ? buttonDisabled()
                  : key === playersMoveCount
                  ? () => {
                      setPlayersMoveCount(playersMoveCount + 1);
                      setCorrectMovesMade([...correctMovesMade, true]);
                    }
                  : buttonDisabled()
              }
            >
              <img
                className={
                  correctMove ? "glassBridge__gamePieceImg" : "hideComponent"
                }
                src={getGamePieceSource(playerProfile.gamePiece)}
                alt="players game piece"
              />
            </button>
            <button
              className={
                wrongMove ? "glassBridge__tile tileWrong" : "glassBridge__tile"
              }
              onClick={
                wrongTileSelected
                  ? buttonDisabled()
                  : key === playersMoveCount
                  ? () => {
                      setPlayersMoveCount(playersMoveCount + 1);
                      setWrongTileSelected(true);
                      setCorrectMovesMade([...correctMovesMade, false]);
                      const timer = setTimeout(() => {
                        setPlayersMoveCount(0);
                        setWrongTileSelected(false);
                        setCorrectMovesMade([]);
                        setExtraLives(extraLives - 1);
                      }, 1750);
                      return () => clearTimeout(timer);
                    }
                  : buttonDisabled()
              }
            >
              <FaSkullCrossbones
                className={wrongMove ? "buttonIcon2" : "hideComponent"}
              />
            </button>
          </>
        ) : (
          <>
            <button
              className={
                wrongMove ? "glassBridge__tile tileWrong" : "glassBridge__tile"
              }
              onClick={
                wrongTileSelected
                  ? buttonDisabled()
                  : key === playersMoveCount
                  ? () => {
                      setPlayersMoveCount(playersMoveCount + 1);
                      setWrongTileSelected(true);
                      setCorrectMovesMade([...correctMovesMade, false]);
                      const timer = setTimeout(() => {
                        setPlayersMoveCount(0);
                        setWrongTileSelected(false);
                        setCorrectMovesMade([]);
                        setExtraLives(extraLives - 1);
                      }, 1750);
                      return () => clearTimeout(timer);
                    }
                  : buttonDisabled()
              }
            >
              <FaSkullCrossbones
                className={wrongMove ? "buttonIcon2" : "hideComponent"}
              />
            </button>
            <button
              className={
                correctMove
                  ? "glassBridge__tile tileCorrect"
                  : "glassBridge__tile"
              }
              onClick={
                wrongTileSelected
                  ? buttonDisabled()
                  : key === playersMoveCount
                  ? () => {
                      setPlayersMoveCount(playersMoveCount + 1);
                      setCorrectMovesMade([...correctMovesMade, true]);
                    }
                  : buttonDisabled()
              }
            >
              <img
                className={
                  correctMove ? "glassBridge__gamePieceImg" : "hideComponent"
                }
                src={getGamePieceSource(playerProfile.gamePiece)}
                alt="players game piece"
              />
            </button>
          </>
        )}
      </div>
    );
  };

  const renderAllRows = () => {
    let rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows.unshift(<span key={i}>{renderRow(answers[i], i)}</span>);
    }
    return rows;
  };

  return (
    <div className="glassBridge">
      <div className="glassBridge__Text">Finish</div>
      {renderAllRows()}
      <div className="glassBridge__Text">Start Here</div>
    </div>
  );
}

export default GlassBridge;
