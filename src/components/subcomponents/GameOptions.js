import React, { useState } from "react";
import Cookies from "universal-cookie";
import { db } from "../../firebase";
import { generateAnswersForBoard } from "../../utils";
import { IoMdMan, IoMdWoman } from "react-icons/io";
import GameWinners from "./GameWinners";
import Title from "./Title";

function GameOptions({
  setPlayer,
  setDifficulty,
  setPlayerGenderMale,
  setAnswers,
  setExtraLives,
  setShowAudioPlayer,
}) {
  const [name, setName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [selectedGenderMale, setSelectedGenderMale] = useState(true);
  const [showGameWinners, setShowGameWinners] = useState(false);
  const cookies = new Cookies();

  const easySelected = selectedDifficulty === "easy";
  const mediumSelected = selectedDifficulty === "medium";
  const hardSelected = selectedDifficulty === "hard";

  const startGamePressed = () => {
    const nameAdded = name.trim();
    setPlayer(nameAdded);
    setDifficulty(selectedDifficulty);
    setPlayerGenderMale(selectedGenderMale);
    cookies.set("player", nameAdded, { path: "/" });
    cookies.set("difficulty", selectedDifficulty, { path: "/" });
    let answers;
    if (hardSelected) {
      answers = generateAnswersForBoard(10);
      setAnswers(answers);
      setExtraLives(5);
    } else if (mediumSelected) {
      answers = generateAnswersForBoard(7);
      setAnswers(answers);
      setExtraLives(4);
    } else {
      answers = generateAnswersForBoard(4);
      setAnswers(answers);
      setExtraLives(2);
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
        batch.update(lookupNameInDatabase, {
          ...doc.data(),
          gamesPlayed: addGame,
          difficultyPlayed: updateDifficultiesPlayed,
        });
      } else {
        let difficultyData;
        if (selectedDifficulty === "hard") {
          difficultyData = { easy: 0, medium: 0, hard: 1 };
        } else if (selectedDifficulty === "medium") {
          difficultyData = { easy: 0, medium: 1, hard: 0 };
        } else {
          difficultyData = { easy: 1, medium: 0, hard: 0 };
        }
        batch.set(lookupNameInDatabase, {
          name: nameAdded,
          gamesPlayed: 1,
          difficultyPlayed: difficultyData,
          difficultyWon: {
            easy: 0,
            medium: 0,
            hard: 0,
          },
        });
      }
      batch.commit();
    });
  };

  if (showGameWinners) {
    setShowAudioPlayer(false);
  } else {
    setShowAudioPlayer(true);
  }

  return (
    <>
      {showGameWinners ? (
        <GameWinners setShowGameWinners={setShowGameWinners} />
      ) : (
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
                  <div
                    className={
                      selectedGenderMale
                        ? "gameOptions__option selectedDifficultyOption"
                        : "gameOptions__option nonselectedDifficultyOption"
                    }
                    onClick={() => setSelectedGenderMale(true)}
                  >
                    <input
                      className="gameOptions__difficultyButton"
                      type="radio"
                      value={selectedGenderMale}
                      name="selectedGenderMale"
                      checked={selectedGenderMale}
                    />
                    <IoMdMan className="buttonIcon" />
                  </div>
                  <div
                    className={
                      !selectedGenderMale
                        ? "gameOptions__option selectedDifficultyOption"
                        : "gameOptions__option nonselectedDifficultyOption"
                    }
                    onClick={() => setSelectedGenderMale(false)}
                  >
                    <input
                      className="gameOptions__difficultyButton"
                      type="radio"
                      value={selectedGenderMale}
                      name="selectedGenderMale"
                      checked={!selectedGenderMale}
                    />
                    <IoMdWoman className="buttonIcon" />
                  </div>
                </div>
              </div>
              <input
                className={"gameOptions__button"}
                type={"submit"}
                value={"Start Game"}
              />
            </form>
            <button
              onClick={() => setShowGameWinners(true)}
              className="gameOptions__button"
            >
              Game Winners
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default GameOptions;
