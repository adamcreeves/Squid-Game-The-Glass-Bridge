import React from "react";
import Title from "./Title";

function GameWinners({ setShowGameWinners }) {
  const winnersList = () => {
    return (
      <div className="gameWinners__list">No one has beat this mode yet</div>
    );
  };
  return (
    <>
      <Title str={"All Game Winners"} classNm={"title"} />
      <div className="gameOptions gameWinners">
        <div>
          <Title str={"Hard mode"} classNm={"title whiteTitle"} />
          {winnersList()}
        </div>
        <div>
          <Title str={"Medium mode"} classNm={"title whiteTitle"} />
          {winnersList()}
        </div>
        <div>
          <Title str={"Easy mode"} classNm={"title whiteTitle"} />
          {winnersList()}
        </div>
        <button
          onClick={() => setShowGameWinners(false)}
          className="gameOptions__button"
        >
          Back
        </button>
      </div>
    </>
  );
}

export default GameWinners;
