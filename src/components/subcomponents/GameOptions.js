import React, { useState } from "react";
import Cookies from "universal-cookie";
import { db } from "../../firebase";
import { generateAnswersForBoard } from "../../utils";
import { IoMdMan, IoMdWoman } from "react-icons/io";

function GameOptions({
  setPlayer,
  setDifficulty,
  setPlayerGenderMale,
  setAnswers,
  setExtraLives,
}) {
  const [name, setName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [selectedGenderMale, setSelectedGenderMale] = useState(true);
  const cookies = new Cookies();
  const dataBase = db.collection("Names Registered");

  const easySelected = selectedDifficulty === "easy";
  const mediumSelected = selectedDifficulty === "medium";
  const hardSelected = selectedDifficulty === "hard";

  const startGamePressed = async () => {
    setPlayer(name.trim());
    setDifficulty(selectedDifficulty);
    setPlayerGenderMale(selectedGenderMale);
    cookies.set("player", name.trim(), { path: "/" });
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
    await dataBase.add({ Player: name.trim() });
  };

  return (
    <form className={"gameOptions"} onSubmit={startGamePressed}>
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
        className={"gameOptions__start"}
        type={"submit"}
        value={"Start Game"}
      />
    </form>
  );
}

export default GameOptions;
