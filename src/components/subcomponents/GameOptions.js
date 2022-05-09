import React, { useState } from "react";
import Cookies from "universal-cookie";
import { db } from "../../firebase/Config";
import { generateAnswersForBoard } from "../../utils";

function GameOptions({ setPlayer, setDifficulty, setAnswers, setExtraLives }) {
  const [name, setName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const cookies = new Cookies();
  const dataBase = db.collection("Names Registered");

  const easySelected = selectedDifficulty === "easy";
  const mediumSelected = selectedDifficulty === "medium";
  const hardSelected = selectedDifficulty === "hard";

  const startGamePressed = async () => {
    setPlayer(name.trim());
    setDifficulty(selectedDifficulty);
    cookies.set("player", name.trim(), { path: "/" });
    cookies.set("difficulty", selectedDifficulty, { path: "/" });
    let answers;
    if (hardSelected) {
      answers = generateAnswersForBoard(10);
      setAnswers(answers);
      setExtraLives(3);
    } else if (mediumSelected) {
      answers = generateAnswersForBoard(7);
      setAnswers(answers);
      setExtraLives(2);
    } else {
      answers = generateAnswersForBoard(4);
      setAnswers(answers);
      setExtraLives(1);
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
      <div className="gameOptions__difficultyContainer">
        <div
          className={
            easySelected
              ? "gameOptions__difficultyOption selectedDifficultyOption"
              : "gameOptions__difficultyOption nonselectedDifficultyOption"
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
              ? "gameOptions__difficultyOption selectedDifficultyOption"
              : "gameOptions__difficultyOption nonselectedDifficultyOption"
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
              ? "gameOptions__difficultyOption selectedDifficultyOption"
              : "gameOptions__difficultyOption nonselectedDifficultyOption"
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
      <input
        className={"gameOptions__start"}
        type={"submit"}
        value={"Start Game"}
      />
    </form>
  );
}

export default GameOptions;
