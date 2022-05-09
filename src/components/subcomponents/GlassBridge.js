import React, { useState } from "react";

function GlassBridge({ numberOfRows, answers }) {
  const [playersMoves, setPlayersMoves] = useState(0);
  const [wrongTileSelected, setWrongTileSelected] = useState(false);
  const buttonDisabled = () => null;

  const renderRow = (correctTile, key) => {
    return (
      <div className="glassBridge__row">
        {correctTile === 0 ? (
          <>
            <button
              className={
                key + 1 === playersMoves
                  ? "glassBridge__tile tileCorrect"
                  : "glassBridge__tile"
              }
              onClick={
                wrongTileSelected
                  ? buttonDisabled()
                  : key === playersMoves
                  ? () => {
                      setPlayersMoves(playersMoves + 1);
                    }
                  : buttonDisabled()
              }
            />
            <button
              className={
                key + 1 === playersMoves
                  ? "glassBridge__tile tileWrong"
                  : "glassBridge__tile"
              }
              onClick={
                wrongTileSelected
                  ? buttonDisabled()
                  : key === playersMoves
                  ? () => {
                      setPlayersMoves(playersMoves + 1);
                      setWrongTileSelected(true);
                      const timer = setTimeout(() => {
                        setPlayersMoves(0);
                        setWrongTileSelected(false);
                      }, 2500);
                      return () => clearTimeout(timer);
                    }
                  : buttonDisabled()
              }
            />
          </>
        ) : (
          <>
            <button
              className={
                key + 1 === playersMoves
                  ? "glassBridge__tile tileWrong"
                  : "glassBridge__tile"
              }
              onClick={
                wrongTileSelected
                  ? buttonDisabled()
                  : key === playersMoves
                  ? () => {
                      setPlayersMoves(playersMoves + 1);
                      setWrongTileSelected(true);
                      const timer = setTimeout(() => {
                        setPlayersMoves(0);
                        setWrongTileSelected(false);
                      }, 2500);
                      return () => clearTimeout(timer);
                    }
                  : buttonDisabled()
              }
            />
            <button
              className={
                key + 1 === playersMoves
                  ? "glassBridge__tile tileCorrect"
                  : "glassBridge__tile"
              }
              onClick={
                wrongTileSelected
                  ? buttonDisabled()
                  : key === playersMoves
                  ? () => {
                      setPlayersMoves(playersMoves + 1);
                    }
                  : buttonDisabled()
              }
            />
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
      <div>{`Players Move: ${playersMoves}`}</div>
      <div className="glassBridge__Text">Finish</div>
      {renderAllRows()}
      <div className="glassBridge__Text">Start</div>
    </div>
  );
}

export default GlassBridge;
