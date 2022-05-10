import React, { useState } from "react";
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
  const toggleInstructions = () => setDisplayInstructions(!displayInstructions);
  const tryAgainPressed = () => {
    let newAnswers;
    setPlayersMoveCount(0);
    setWrongTileSelected(false);
    setCorrectMovesMade([]);
    setGameWon(false);
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

  if (extraLives < 0) {
    return (
      <>
        <div className={"title"}>YOU FELL TO YOUR DEATH!</div>
        <button
          onClick={backToMainMenuPressed}
          className="gameOptions__start  extraTopMargin"
        >
          Main Menu
        </button>
        <button onClick={tryAgainPressed} className="gameOptions__start">
          Try Again
        </button>
        <div className={"title extraTopMargin"}>GAME OVER</div>
      </>
    );
  }

  if (gameWon) {
    return (
      <>
        <div className={"title"}>{`YOU WON THE SQUID GAME`}</div>
        <div className={"title extraTopMargin"}>{`${player}!`}</div>
        <button
          onClick={backToMainMenuPressed}
          className="gameOptions__start extraTopMargin"
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
        <div className="gameBody__livesContainer">
          <div className="gameBody__lives playerName">{player}</div>
          <br />
          <div className="gameBody__lives">{displayedDifficulty}</div>
          <div className="gameBody__lives">{"Mode"}</div>
          <br />
          <div className="gameBody__lives">{"Lives"}</div>
          <div className="gameBody__lives">{`x${extraLives}`}</div>
        </div>
      </div>
    </>
  );
}

export default GameBody;
