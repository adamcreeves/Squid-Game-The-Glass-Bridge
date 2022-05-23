import React, { useState } from "react";
import { playerWonForDBUpdate, tryAgain } from "../../utils";
import GlassBridge from "./GlassBridge";
import { CgProfile } from "react-icons/cg";
import Profile from "./Profile";
import Cookies from "universal-cookie";
import GameOver from "./GameOver";
import GameWon from "./GameWon";
import GameInstructions from "./GameInstructions";
import {
  s005,
  s006,
  s007,
  s008,
  s014,
  s020,
  s021,
  s022,
  s023,
  s024,
  s025,
} from "../../resources/Strings";
import {
  c019,
  c020,
  c021,
  c022,
  c023,
  c024,
  c025,
  c026,
  c027,
} from "../../resources/ClassNames";
import {
  easyExtraLives,
  hardExtraLives,
  mediumExtraLives,
} from "../../resources/Config";

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
  const storedProfile = cookies.get(s014) || playerProfile;
  const [playersMoveCount, setPlayersMoveCount] = useState(0);
  const [wrongTileSelected, setWrongTileSelected] = useState(false);
  const [correctMovesMade, setCorrectMovesMade] = useState([]);
  const [displayInstructions, setDisplayInstructions] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const playerHasLostLife =
    (difficulty === s007 && extraLives < hardExtraLives) ||
    (difficulty === s006 && extraLives < mediumExtraLives) ||
    (difficulty === s005 && extraLives < easyExtraLives);

  const playerRanOutOfLives = extraLives < 0;

  const classForLongNames = player.length > 5 ? c020 : c019;

  const displayedDifficulty =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  const mainMenuPressedAfterWin = () => {
    playerWonForDBUpdate(player, difficulty, true, false, playerProfile);
    setGameWon(false);
    resetGame();
  };

  const mainMenuPressedAfterLoss = () => {
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
    if (playerHasLostLife) {
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

  if (playerRanOutOfLives) {
    return (
      <GameOver
        mainMenuPressed={mainMenuPressedAfterLoss}
        playAgainPressed={playAgainAfterLoss}
        setShowAudioPlayer={setShowAudioPlayer}
      />
    );
  }

  if (gameWon) {
    return (
      <GameWon
        player={player}
        mainMenuPressed={mainMenuPressedAfterWin}
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
    <div className={c021}>
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
      <div className={c022}>
        <button onClick={mainMenuPressedAfterLoss} className={c023}>
          {s008}
        </button>
        <button onClick={toggleInstructions} className={c023}>
          {s020}
        </button>
        <button onClick={playAgainAfterLoss} className={c023}>
          {s021}
        </button>
      </div>
      <div className={c024}>
        <div className={classForLongNames}>{player}</div>
        <br />
        <div className={c019}>{displayedDifficulty}</div>
        <div className={c019}>{s023}</div>
        <br />
        <div className={c019}>{s024}</div>
        <div className={c019}>{s025 + extraLives}</div>
      </div>
      <button className={c025} onClick={() => setShowProfile(true)}>
        <CgProfile className={c026} />
        <label className={c027}>{s022}</label>
      </button>
    </div>
  );
}

export default GameBody;
