import React from "react";
import {
  c040,
  c041,
  c046,
  c049,
  c050,
  c051,
  c052,
} from "../../resources/ClassNames";
import { s039, s041, s050 } from "../../resources/Strings";
import { gamePiecesArray } from "../../utils";

function GamePieces({ selectedGamePiece, setSelectedGamePiece }) {
  return (
    <div className={c040}>
      <div className={c041}>{s039}</div>
      <div className={c049}>
        {gamePiecesArray.map((gamePiece, index) => (
          <div
            className={selectedGamePiece === index ? c050 : c051}
            onClick={() => setSelectedGamePiece(index)}
          >
            <input
              className={c046}
              type={s041}
              value={selectedGamePiece}
              name={s050}
              checked={selectedGamePiece === index}
            />
            <img className={c052} src={gamePiece} alt={gamePiece} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamePieces;
