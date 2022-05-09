import React, { useState } from "react";
import Title from "./subcomponents/Title";
import GameBody from "./subcomponents/GameBody";
import Cookies from "universal-cookie";
import GameOptions from "./subcomponents/GameOptions";

function Body() {
  const cookies = new Cookies();
  const storedPlayer = cookies.get("player") || "";
  const storedDifficulty = cookies.get("difficulty") || "easy";
  const storeAnswerArray = cookies.get("answers") || [];
  const extraLivesForGame =
    storedDifficulty === "hard" ? 3 : storedDifficulty === "medium" ? 2 : 1;
  const [player, setPlayer] = useState(storedPlayer);
  const [difficulty, setDifficulty] = useState(storedDifficulty);
  const [answers, setAnswers] = useState(storeAnswerArray);
  const [extraLives, setExtraLives] = useState(extraLivesForGame);
  const resetGame = () => {
    setPlayer("");
    cookies.remove("player");
  };
  return (
    <div className={"body"} data-testid="body-component">
      {!player ? (
        <>
          <Title str={"New Game - Options"} classNm={"title"} />
          <GameOptions
            setPlayer={setPlayer}
            setDifficulty={setDifficulty}
            setAnswers={setAnswers}
            setExtraLives={setExtraLives}
          />
        </>
      ) : (
        <GameBody
          player={player}
          difficulty={difficulty}
          answers={answers}
          extraLives={extraLives}
          resetGame={resetGame}
        />
      )}
    </div>
  );
}

export default Body;
