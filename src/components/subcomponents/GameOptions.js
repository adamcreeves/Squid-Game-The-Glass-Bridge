import React, { useState } from "react";
import Cookies from "universal-cookie";
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
  const [name, setName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [showGameWinners, setShowGameWinners] = useState(false);
  const cookies = new Cookies();

  const easySelected = selectedDifficulty === "easy";
  const mediumSelected = selectedDifficulty === "medium";
  const hardSelected = selectedDifficulty === "hard";

  const gameWinnersPressed = () => {
    const storedWinners = cookies.get("allWinners") || {};
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
      <Title str={"Main Menu"} classNm={"title"} />
      <div className={"gameOptions"}>
        <form className={"gameOptions__form"} onSubmit={handleStartGame}>
          <input
            className={"gameOptions__playerName"}
            type={"text"}
            placeholder={"Enter Player Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="gameOptions__selectorsContainer">
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
          <input
            className={"gameOptions__button"}
            type={"submit"}
            value={"Start Game"}
          />
        </form>
        <button onClick={gameWinnersPressed} className="gameOptions__button">
          Game Winners
        </button>
      </div>
    </>
  );
}

export default GameOptions;
