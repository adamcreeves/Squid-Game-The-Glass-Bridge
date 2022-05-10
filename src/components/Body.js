import React, { useState } from "react";
import Title from "./subcomponents/Title";
import GameBody from "./subcomponents/GameBody";
import Cookies from "universal-cookie";
import GameOptions from "./subcomponents/GameOptions";
import Loader from "./subcomponents/Loader";

function Body() {
  const cookies = new Cookies();
  const storedPlayer = cookies.get("player") || "";
  const storedDifficulty = cookies.get("difficulty") || "easy";
  const storeAnswerArray = cookies.get("answers") || [];
  const extraLivesForGame =
    storedDifficulty === "hard" ? 5 : storedDifficulty === "medium" ? 4 : 2;

  const [player, setPlayer] = useState(storedPlayer);
  const [difficulty, setDifficulty] = useState(storedDifficulty);
  const [playerGenderMale, setPlayerGenderMale] = useState(true);
  const [answers, setAnswers] = useState(storeAnswerArray);
  const [extraLives, setExtraLives] = useState(extraLivesForGame);
  const [resetApp, setResetApp] = useState(false);

  const resetGame = () => {
    setResetApp(true);
    setPlayer("");
    cookies.remove("player");
    cookies.remove("answers");
    cookies.remove("difficulty");
    const timer = setTimeout(() => {
      setResetApp(false);
    }, 2500);
    return () => clearTimeout(timer);
  };

  if (resetApp) {
    return (
      <div className={"loaderContainer"}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={"body"} data-testid="body-component">
      {!player ? (
        <>
          <Title str={"Main Menu"} classNm={"title"} />
          <GameOptions
            setPlayer={setPlayer}
            setDifficulty={setDifficulty}
            setPlayerGenderMale={setPlayerGenderMale}
            setAnswers={setAnswers}
            setExtraLives={setExtraLives}
          />
        </>
      ) : (
        <GameBody
          player={player}
          difficulty={difficulty}
          playerGenderMale={playerGenderMale}
          answers={answers}
          extraLives={extraLives}
          resetGame={resetGame}
          setExtraLives={setExtraLives}
          setAnswers={setAnswers}
          cookies={cookies}
        />
      )}
    </div>
  );
}

export default Body;
