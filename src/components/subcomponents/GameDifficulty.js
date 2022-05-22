import React from "react";

function GameDifficulty({
  selectedDifficulty,
  setSelectedDifficulty,
  easySelected,
  mediumSelected,
  hardSelected,
}) {
  return (
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
  );
}

export default GameDifficulty;
