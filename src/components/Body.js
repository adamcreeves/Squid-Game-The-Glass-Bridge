import React, { useState } from "react";
import GameBody from "./subcomponents/GameBody";
import Cookies from "universal-cookie";
import GameOptions from "./subcomponents/GameOptions";
import Loader from "./subcomponents/Loader";
import ReactAudioPlayer from "react-audio-player";

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
  const [showAudioPlayer, setShowAudioPlayer] = useState(true);

  const resetGame = () => {
    setShowAudioPlayer(false);
    setResetApp(true);
    setPlayer("");
    cookies.remove("player");
    cookies.remove("answers");
    cookies.remove("difficulty");
    const timer = setTimeout(() => {
      setResetApp(false);
      setShowAudioPlayer(true);
    }, 2500);
    return () => clearTimeout(timer);
  };

  return (
    <div className={"body"} data-testid="body-component">
      {resetApp ? (
        <div className={"loaderContainer"}>
          <Loader />
        </div>
      ) : (
        <>
          {!player ? (
            <>
              <GameOptions
                setPlayer={setPlayer}
                setDifficulty={setDifficulty}
                setPlayerGenderMale={setPlayerGenderMale}
                setAnswers={setAnswers}
                setExtraLives={setExtraLives}
                setShowAudioPlayer={setShowAudioPlayer}
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
              setShowAudioPlayer={setShowAudioPlayer}
            />
          )}
        </>
      )}
      <ReactAudioPlayer
        className="audioPlayer"
        src="SquidGameRemix.mp3"
        autoPlay
        volume={0.5}
        controls={showAudioPlayer}
        loop
      />
    </div>
  );
}

export default Body;
