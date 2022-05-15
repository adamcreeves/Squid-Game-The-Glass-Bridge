import React, { useState } from "react";
import { db } from "../../firebase";
import { generateAnswersForBoard } from "../../utils";
import GlassBridge from "./GlassBridge";

function GameBody({
  player,
  difficulty,
  playerGenderMale,
  answers,
  extraLives,
  resetGame,
  setExtraLives,
  setAnswers,
  cookies,
  setShowAudioPlayer,
}) {
  const [playersMoveCount, setPlayersMoveCount] = useState(0);
  const [wrongTileSelected, setWrongTileSelected] = useState(false);
  const [correctMovesMade, setCorrectMovesMade] = useState([]);
  const [displayInstructions, setDisplayInstructions] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const displayedDifficulty =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const backToMainMenuPressed = () => {
    setGameWon(false);
    resetGame();
  };
  const toggleInstructions = () => {
    setDisplayInstructions(!displayInstructions);
    setShowAudioPlayer(true);
  };
  const tryAgainPressed = () => {
    let newAnswers;
    setShowAudioPlayer(true);
    setPlayersMoveCount(0);
    setWrongTileSelected(false);
    setCorrectMovesMade([]);
    setGameWon(false);

    handleUpdateDBWinLoss();

    if (difficulty === "hard") {
      newAnswers = generateAnswersForBoard(10);
      setAnswers(newAnswers);
      setExtraLives(5);
    } else if (difficulty === "medium") {
      newAnswers = generateAnswersForBoard(7);
      setAnswers(newAnswers);
      setExtraLives(4);
    } else {
      newAnswers = generateAnswersForBoard(4);
      setAnswers(newAnswers);
      setExtraLives(2);
    }
    cookies.set("answers", newAnswers, { path: "/" });
  };

  const handleUpdateDBWinLoss = () => {
    const batch = db.batch();
    const lookupNameInDatabase = db
      .collection("Players")
      .doc(player.toLowerCase());
    lookupNameInDatabase.get().then((doc) => {
      if (doc.exists) {
        if (gameWon) {
          let updateDifficultyWon;
          if (difficulty === "hard") {
            updateDifficultyWon = doc.data().wonOnHard + 1;
            batch.update(lookupNameInDatabase, {
              ...doc.data(),
              wonOnHard: updateDifficultyWon,
            });
            batch.commit();
          } else if (difficulty === "medium") {
            updateDifficultyWon = doc.data().wonOnMedium + 1;
            batch.update(lookupNameInDatabase, {
              ...doc.data(),
              wonOnMedium: updateDifficultyWon,
            });
            batch.commit();
          } else {
            updateDifficultyWon = doc.data().wonOnEasy + 1;
            batch.update(lookupNameInDatabase, {
              ...doc.data(),
              wonOnEasy: updateDifficultyWon,
            });
            batch.commit();
          }
        }
        let updateDifficultiesPlayed;
        const updateGamesPlayed = doc.data().gamesPlayed + 1;
        if (difficulty === "hard") {
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            hard: doc.data().difficultyPlayed.hard + 1,
          };
        } else if (difficulty === "medium") {
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            medium: doc.data().difficultyPlayed.medium + 1,
          };
        } else {
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            easy: doc.data().difficultyPlayed.easy + 1,
          };
        }
        batch.update(lookupNameInDatabase, {
          ...doc.data(),
          difficultyPlayed: updateDifficultiesPlayed,
          gamesPlayed: updateGamesPlayed,
        });
        batch.commit();
      }
    });
  };

  if (extraLives < 0) {
    setShowAudioPlayer(false);
    return (
      <>
        <div className={"title"}>YOU FELL TO YOUR DEATH!</div>
        <button
          onClick={backToMainMenuPressed}
          className="gameOptions__button  extraTopMargin"
        >
          Main Menu
        </button>
        <button onClick={tryAgainPressed} className="gameOptions__button">
          Try Again
        </button>
        <div className={"title extraTopMargin"}>GAME OVER</div>
      </>
    );
  }

  if (gameWon) {
    setShowAudioPlayer(false);
    handleUpdateDBWinLoss();

    return (
      <>
        <div className={"title"}>{`YOU WON THE SQUID GAME`}</div>
        <div className={"title extraTopMargin"}>{`${player}!`}</div>
        <button
          onClick={backToMainMenuPressed}
          className="gameOptions__button extraTopMargin"
        >
          Play Again
        </button>
        <div
          className={"title extraTopMargin"}
        >{`on ${displayedDifficulty}`}</div>
      </>
    );
  }

  if (displayInstructions) {
    setShowAudioPlayer(false);
    return (
      <div className="gameBody instructionsContainer">
        <div className="gameBody__details">{`To win the game you must cross the glass bridge. 
        As you move, you must choose the left or right path. If you choose correctly, the 
        glass tile will hold your weight (tile turns green) and you can continue to cross. 
        If you choose wrong, the glass tile will break (tile turns red and you start back at 
        the beginning). If you run out of lives, you will fall to your death and the game is 
        over. Start at the bottom row. Good luck ${player}!`}</div>
        <button
          onClick={toggleInstructions}
          className="gameBody__button extraTopMargin"
        >
          Back to the Game
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="gameBody">
        <GlassBridge
          numberOfRows={answers.length}
          answers={answers}
          playerGenderMale={playerGenderMale}
          extraLives={extraLives}
          setExtraLives={setExtraLives}
          playersMoveCount={playersMoveCount}
          setPlayersMoveCount={setPlayersMoveCount}
          wrongTileSelected={wrongTileSelected}
          setWrongTileSelected={setWrongTileSelected}
          correctMovesMade={correctMovesMade}
          setCorrectMovesMade={setCorrectMovesMade}
          setGameWon={setGameWon}
        />
        <div className="gameBody__buttonContainer">
          <button onClick={backToMainMenuPressed} className="gameBody__button">
            Main Menu
          </button>
          <button onClick={toggleInstructions} className="gameBody__button">
            How to Play
          </button>
          <button onClick={tryAgainPressed} className="gameBody__button">
            Reset Game
          </button>
        </div>
        <div className="gameBody__hudContainer">
          <div className="gameBody__hud playerName">{player}</div>
          <br />
          <div className="gameBody__hud">{displayedDifficulty}</div>
          <div className="gameBody__hud">{"Mode"}</div>
          <br />
          <div className="gameBody__hud">{"Lives"}</div>
          <div className="gameBody__hud">{`x${extraLives}`}</div>
        </div>
      </div>
    </>
  );
}

export default GameBody;
