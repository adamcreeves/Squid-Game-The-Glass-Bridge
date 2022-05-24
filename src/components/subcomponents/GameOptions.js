import React, { useState } from "react";
import Cookies from "universal-cookie";
import { c013, c014, c015, c016, c017, c018 } from "../../resources/ClassNames";
import {
  s003,
  s004,
  s005,
  s006,
  s007,
  s008,
  s009,
  s010,
  s011,
  s012,
  s013,
} from "../../resources/Strings";
import { startGamePressed } from "../../utils";
import GameDifficulty from "./GameDifficulty";
import GamePieces from "./GamePieces";
import GameWinners from "./GameWinners";
import Title from "./Title";

function GameOptions({
  setPlayer,
  setDifficulty,
  selectedGamePiece,
  setSelectedGamePiece,
  setAnswers,
  setExtraLives,
  setShowAudioPlayer,
  setPlayerProfile,
  allWinners,
  setAllWinners,
}) {
  const cookies = new Cookies();
  const [name, setName] = useState(s004);
  const [selectedDifficulty, setSelectedDifficulty] = useState(s005);
  const [showGameWinners, setShowGameWinners] = useState(false);

  const easySelected = selectedDifficulty === s005;
  const mediumSelected = selectedDifficulty === s006;
  const hardSelected = selectedDifficulty === s007;

  const gameWinnersPressed = () => {
    const storedWinners = cookies.get(s003) || {};
    if (storedWinners && storedWinners !== allWinners) {
      setAllWinners(storedWinners);
    }
    setShowGameWinners(true);
  };

  const handleStartGame = () =>
    startGamePressed(
      name,
      setPlayer,
      setDifficulty,
      selectedDifficulty,
      hardSelected,
      mediumSelected,
      setAnswers,
      setExtraLives,
      selectedGamePiece,
      setPlayerProfile
    );

  if (showGameWinners) {
    return (
      <GameWinners
        setShowAudioPlayer={setShowAudioPlayer}
        setShowGameWinners={setShowGameWinners}
        allWinners={allWinners}
      />
    );
  } else {
    setShowAudioPlayer(true);
  }

  return (
    <>
      <Title str={s008} classNm={c013} />
      <div className={c014}>
        <form className={c015} onSubmit={handleStartGame}>
          <input
            className={c016}
            type={s009}
            placeholder={s010}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className={c017}>
            <GameDifficulty
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              easySelected={easySelected}
              mediumSelected={mediumSelected}
              hardSelected={hardSelected}
            />
            <GamePieces
              selectedGamePiece={selectedGamePiece}
              setSelectedGamePiece={setSelectedGamePiece}
            />
          </div>
          <input className={c018} type={s011} value={s012} />
        </form>
        <button onClick={gameWinnersPressed} className={c018}>
          {s013}
        </button>
      </div>
    </>
  );
}

export default GameOptions;
