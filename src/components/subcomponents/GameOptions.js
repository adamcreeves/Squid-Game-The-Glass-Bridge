import React, { useState } from "react";
import Cookies from "universal-cookie";
import { db } from "../../firebase/Config";

function GameOptions({ setPlayer, setDifficulty }) {
  const [name, setName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const cookies = new Cookies();
  const dataBase = db.collection("Names Registered");
  const startGamePressed = async () => {
    setPlayer(name.trim());
    setDifficulty(selectedDifficulty);
    cookies.set("player", name.trim(), { path: "/" });
    cookies.set("difficulty");
    await dataBase.add({ Player: name.trim() });
  };
  const easySelected = selectedDifficulty === "easy";
  const mediumSelected = selectedDifficulty === "medium";
  const hardSelected = selectedDifficulty === "hard";

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
