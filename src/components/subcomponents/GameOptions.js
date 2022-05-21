import React, { useState } from "react";
import Cookies from "universal-cookie";
import { db } from "../../firebase";
import { gamePiecesArray, generateAnswersForBoard } from "../../utils";
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

  const startGamePressed = () => {
    const nameAdded = name
      .trim()
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
    setPlayer(nameAdded);
    setDifficulty(selectedDifficulty);
    cookies.set("player", nameAdded, { path: "/" });
    cookies.set("difficulty", selectedDifficulty, { path: "/" });
    let answers;
    if (hardSelected) {
      answers = generateAnswersForBoard(12);
      setAnswers(answers);
      setExtraLives(6);
    } else if (mediumSelected) {
      answers = generateAnswersForBoard(8);
      setAnswers(answers);
      setExtraLives(4);
    } else {
      answers = generateAnswersForBoard(5);
      setAnswers(answers);
      setExtraLives(3);
    }
    cookies.set("answers", answers, { path: "/" });

    const batch = db.batch();
    const lookupNameInDatabase = db
      .collection("Players")
      .doc(nameAdded.toLowerCase());
    lookupNameInDatabase.get().then((doc) => {
      if (doc.exists) {
        const addGame = doc.data().gamesPlayed + 1;
        let updateDifficultiesPlayed;
        if (selectedDifficulty === "hard") {
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            hard: doc.data().difficultyPlayed.hard + 1,
          };
        } else if (selectedDifficulty === "medium") {
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

        const dataToSave = {
          ...doc.data(),
          gamesPlayed: addGame,
          difficultyPlayed: updateDifficultiesPlayed,
          gamePiece: selectedGamePiece,
        };
        setPlayerProfile(dataToSave);
        cookies.set("playerProfile", dataToSave, { path: "/" });
        batch.update(lookupNameInDatabase, dataToSave);
      } else {
        let difficultyData;
        if (selectedDifficulty === "hard") {
          difficultyData = { easy: 0, medium: 0, hard: 1 };
        } else if (selectedDifficulty === "medium") {
          difficultyData = { easy: 0, medium: 1, hard: 0 };
        } else {
          difficultyData = { easy: 1, medium: 0, hard: 0 };
        }

        const dataToSave = {
          name: nameAdded,
          gamesPlayed: 1,
          difficultyPlayed: difficultyData,
          difficultyWon: {
            easy: 0,
            medium: 0,
            hard: 0,
          },
          gamePiece: selectedGamePiece,
        };
        setPlayerProfile(dataToSave);
        cookies.set("playerProfile", dataToSave, { path: "/" });
        batch.set(lookupNameInDatabase, dataToSave);
      }
      batch.commit();
    });
  };

  const renderGamePieces = () =>
    gamePiecesArray.map((gamePiece, index) => (
      <div
        className={
          selectedGamePiece === index
            ? "gameOptions__option gameOptions__gamePieceButton selectedDifficultyOption"
            : "gameOptions__option gameOptions__gamePieceButton nonselectedDifficultyOption"
        }
        onClick={() => setSelectedGamePiece(index)}
      >
        <input
          className="gameOptions__difficultyButton"
          type="radio"
          value={selectedGamePiece}
          name="selectedGenderMale"
          checked={selectedGamePiece === index}
        />
        <img
          className="gameOptions__gamePieceImg"
          src={gamePiece}
          alt={gamePiece}
        />
      </div>
    ));

  if (showGameWinners) {
    setShowAudioPlayer(false);
    return (
      <GameWinners
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
        <form className={"gameOptions__form"} onSubmit={startGamePressed}>
          <input
            className={"gameOptions__playerName"}
            type={"text"}
            placeholder={"Enter Player Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="gameOptions__selectorsContainer">
            <div className="gameOptions__container">
              <div className="whiteTitle centerText">Difficulty</div>
              <div
                className={
                  easySelected
                    ? "gameOptions__option selectedDifficultyOption"
                    : "gameOptions__option nonselectedDifficultyOption"
                }
                onClick={() => setSelectedDifficulty("easy")}
              >
                <input
                  className={"gameOptions__difficultyButton"}
                  type="radio"
                  value={selectedDifficulty}
                  name="selectedDifficulty"
                  checked={easySelected}
                />
                <label
                  className={
                    easySelected
                      ? "gameOptions__difficultyLabelSelected"
                      : "gameOptions__difficultyLabelUnselected"
                  }
                >
                  Easy
                </label>
              </div>
              <div
                className={
                  mediumSelected
                    ? "gameOptions__option selectedDifficultyOption"
                    : "gameOptions__option nonselectedDifficultyOption"
                }
                onClick={() => setSelectedDifficulty("medium")}
              >
                <input
                  className="gameOptions__difficultyButton"
                  type="radio"
                  value={selectedDifficulty}
                  name="selectedDifficulty"
                  checked={mediumSelected}
                />
                <label
                  className={
                    mediumSelected
                      ? "gameOptions__difficultyLabelSelected"
                      : "gameOptions__difficultyLabelUnselected"
                  }
                >
                  Medium
                </label>
              </div>
              <div
                className={
                  hardSelected
                    ? "gameOptions__option selectedDifficultyOption"
                    : "gameOptions__option nonselectedDifficultyOption"
                }
                onClick={() => setSelectedDifficulty("hard")}
              >
                <input
                  className="gameOptions__difficultyButton"
                  type="radio"
                  value={selectedDifficulty}
                  name="selectedDifficulty"
                  checked={hardSelected}
                />
                <label
                  className={
                    hardSelected
                      ? "gameOptions__difficultyLabelSelected"
                      : "gameOptions__difficultyLabelUnselected"
                  }
                >
                  Hard
                </label>
              </div>
            </div>
            <div className="gameOptions__container">
              <div className="whiteTitle centerText">Game pieces</div>
              <div className="gameOptions__gamePieceContainer">
                {renderGamePieces()}
              </div>
            </div>
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
