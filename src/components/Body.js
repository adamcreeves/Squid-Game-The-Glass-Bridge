import React, { useState } from "react";
import GameBody from "./subcomponents/GameBody";
import Cookies from "universal-cookie";
import GameOptions from "./subcomponents/GameOptions";
import Loader from "./subcomponents/Loader";
import ReactAudioPlayer from "react-audio-player";
import { resetGame } from "../utils";
import { c005, c006, c007, c009, c010, c011 } from "../resources/ClassNames";

function Body({ allWinners, setAllWinners }) {
  const cookies = new Cookies();
  const storedPlayer = cookies.get("player") || "";
  const storedDifficulty = cookies.get("difficulty") || "easy";
  const storeAnswerArray = cookies.get("answers") || [];
  const extraLivesForGame =
    storedDifficulty === "hard" ? 6 : storedDifficulty === "medium" ? 4 : 3;
  const storedPlayerProfile = cookies.get("playerProfile") || {};
  const storedGamePiece = parseInt(storedPlayerProfile.gamePiece, 0) || 0;

  const [player, setPlayer] = useState(storedPlayer);
  const [selectedGamePiece, setSelectedGamePiece] = useState(storedGamePiece);
  const [playerProfile, setPlayerProfile] = useState(storedPlayerProfile);
  const [difficulty, setDifficulty] = useState(storedDifficulty);
  const [answers, setAnswers] = useState(storeAnswerArray);
  const [extraLives, setExtraLives] = useState(extraLivesForGame);
  const [resetApp, setResetApp] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(true);

  const audioPlayerClass =
    showAudioPlayer && player ? c009 : showAudioPlayer && !player ? c010 : c011;

  const handleGameReset = () =>
    resetGame(setShowAudioPlayer, setResetApp, setPlayer);

  return (
    <div className={c005} data-testid="body-component">
      {resetApp ? (
        <Loader />
      ) : !player ? (
        <>
          <GameOptions
            setPlayer={setPlayer}
            setDifficulty={setDifficulty}
            setAnswers={setAnswers}
            setExtraLives={setExtraLives}
            setShowAudioPlayer={setShowAudioPlayer}
            setPlayerProfile={setPlayerProfile}
            selectedGamePiece={selectedGamePiece}
            setSelectedGamePiece={setSelectedGamePiece}
            allWinners={allWinners}
            setAllWinners={setAllWinners}
          />
        </>
      ) : (
        <GameBody
          player={player}
          difficulty={difficulty}
          answers={answers}
          extraLives={extraLives}
          resetGame={handleGameReset}
          setExtraLives={setExtraLives}
          setAnswers={setAnswers}
          cookies={cookies}
          setShowAudioPlayer={setShowAudioPlayer}
          playerProfile={playerProfile}
        />
      )}
      <div className={audioPlayerClass}>
        <ReactAudioPlayer
          className={c006}
          src="SquidGameRemix.mp3"
          volume={0.5}
          controls={showAudioPlayer}
          loop
        />
        <div className={c007}>Music</div>
      </div>
    </div>
  );
}

export default Body;
