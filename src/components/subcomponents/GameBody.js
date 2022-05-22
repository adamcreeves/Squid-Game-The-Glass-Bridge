import React, { useState } from "react";
import { playerWonForDBUpdate, tryAgain } from "../../utils";
import GlassBridge from "./GlassBridge";
import { CgProfile } from "react-icons/cg";
import Profile from "./Profile";
import Cookies from "universal-cookie";
import GameOver from "./GameOver";
import GameWon from "./GameWon";
import GameInstructions from "./GameInstructions";

function GameBody({
  player,
  difficulty,
  answers,
  extraLives,
  resetGame,
  setExtraLives,
  setAnswers,
  setShowAudioPlayer,
  playerProfile,
}) {
  const cookies = new Cookies();
  const storedProfile = cookies.get("playerProfile") || playerProfile;
  const [playersMoveCount, setPlayersMoveCount] = useState(0);
  const [wrongTileSelected, setWrongTileSelected] = useState(false);
  const [correctMovesMade, setCorrectMovesMade] = useState([]);
  const [displayInstructions, setDisplayInstructions] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const classForLongNames =
    player.length > 5 ? "playerName gameBody__hud" : "gameBody__hud";

  const displayedDifficulty =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  const backToMainMenuPressedAfterWin = () => {
    playerWonForDBUpdate(player, difficulty, true, false, playerProfile);
    setGameWon(false);
    resetGame();
  };

  const backToMainMenuPressedAfterLoss = () => {
    playerWonForDBUpdate(player, difficulty, false, false, playerProfile);
    resetGame();
  };

  const playAgainAfterWin = () => {
    playerWonForDBUpdate(player, difficulty, true, true, playerProfile);
    tryAgain(
      true,
      setGameWon,
      setShowAudioPlayer,
      setPlayersMoveCount,
      setWrongTileSelected,
      setCorrectMovesMade,
      difficulty,
      setAnswers,
      setExtraLives,
      storedProfile
    );
  };

  const playAgainAfterLoss = () => {
    if (
      (difficulty === "hard" && extraLives < 5) ||
      (difficulty === "medium" && extraLives < 4) ||
      (difficulty === "easy" && extraLives < 3)
    ) {
      playerWonForDBUpdate(player, difficulty, false, false, playerProfile);
      tryAgain(
        false,
        setGameWon,
        setShowAudioPlayer,
        setPlayersMoveCount,
        setWrongTileSelected,
        setCorrectMovesMade,
        difficulty,
        setAnswers,
        setExtraLives,
        storedProfile
      );
    }
  };

  const toggleInstructions = () => {
    setDisplayInstructions(!displayInstructions);
    setShowAudioPlayer(true);
  };

  if (extraLives < 0) {
    return (
      <GameOver
        mainMenuPressed={backToMainMenuPressedAfterLoss}
        playAgainPressed={playAgainAfterLoss}
        setShowAudioPlayer={setShowAudioPlayer}
      />
    );
  }

  if (gameWon) {
    return (
      <GameWon
        player={player}
        mainMenuPressed={backToMainMenuPressedAfterWin}
        playAgainPressed={playAgainAfterWin}
        displayedDifficulty={displayedDifficulty}
        setShowAudioPlayer={setShowAudioPlayer}
      />
    );
  }

  if (displayInstructions) {
    return (
      <GameInstructions
        player={player}
        toggleInstructions={toggleInstructions}
        setShowAudioPlayer={setShowAudioPlayer}
      />
    );
  }

  if (showProfile) {
    return (
      <Profile
        player={player}
        setShowProfile={setShowProfile}
        setShowAudioPlayer={setShowAudioPlayer}
        playerProfile={storedProfile}
      />
    );
  }

  return (
    <div className="gameBody">
      <GlassBridge
        numberOfRows={answers.length}
        answers={answers}
        extraLives={extraLives}
        setExtraLives={setExtraLives}
        playersMoveCount={playersMoveCount}
        setPlayersMoveCount={setPlayersMoveCount}
        wrongTileSelected={wrongTileSelected}
        setWrongTileSelected={setWrongTileSelected}
        correctMovesMade={correctMovesMade}
        setCorrectMovesMade={setCorrectMovesMade}
        setGameWon={setGameWon}
        playerProfile={playerProfile}
      />
      <div className="gameBody__buttonContainer">
        <button
          onClick={backToMainMenuPressedAfterLoss}
          className="gameBody__button"
        >
          Main Menu
        </button>
        <button onClick={toggleInstructions} className="gameBody__button">
          How to Play
        </button>
        <button onClick={playAgainAfterLoss} className="gameBody__button">
          Reset Game
        </button>
      </div>
      <div className="gameBody__hudContainer">
        <div className={classForLongNames}>{player}</div>
        <br />
        <div className="gameBody__hud">{displayedDifficulty}</div>
        <div className="gameBody__hud">{"Mode"}</div>
        <br />
        <div className="gameBody__hud">{"Lives"}</div>
        <div className="gameBody__hud">{`x${extraLives}`}</div>
      </div>
      <button
        className="gameBody__profileButton"
        onClick={() => setShowProfile(true)}
      >
        <CgProfile className="gameBody__profileIcon" />
        <label className="gameBody__profileLabel">Profile</label>
      </button>
    </div>
  );
}

export default GameBody;
