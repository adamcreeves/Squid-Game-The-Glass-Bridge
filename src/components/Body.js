import React, { useState } from "react";
import Title from "./subcomponents/Title";
import GameBody from "./subcomponents/GameBody";
import Cookies from "universal-cookie";
import GameOptions from "./subcomponents/GameOptions";

function Body() {
  const cookies = new Cookies();
  const storedPlayer = cookies.get("player") || "";
  const storedDifficulty = cookies.get("difficulty") || "easy";
  const [player, setPlayer] = useState(storedPlayer);
  const [difficulty, setDifficulty] = useState(storedDifficulty);
  const resetGame = () => {
    setPlayer("");
    cookies.remove("player");
  };
  return (
    <div className={"body"} data-testid="body-component">
      {!player ? (
        <>
          <Title str={"New Game - Options"} classNm={"title"} />
          <GameOptions setPlayer={setPlayer} setDifficulty={setDifficulty} />
        </>
      ) : (
        <GameBody
          player={player}
          difficulty={difficulty}
          resetGame={resetGame}
        />
      )}
    </div>
  );
}

export default Body;
