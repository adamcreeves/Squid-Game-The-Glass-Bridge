import React from "react";
import {
  c040,
  c041,
  c042,
  c043,
  c044,
  c045,
  c046,
} from "../../resources/ClassNames";
import {
  s005,
  s006,
  s007,
  s041,
  s042,
  s043,
  s044,
  s045,
  s046,
} from "../../resources/Strings";

function GameDifficulty({
  selectedDifficulty,
  setSelectedDifficulty,
  easySelected,
  mediumSelected,
  hardSelected,
}) {
  return (
    <div className={c040}>
      <div className={c041}>{s043}</div>
      <div
        className={easySelected ? c042 : c043}
        onClick={() => setSelectedDifficulty(s005)}
      >
        <input
          className={c046}
          type={s041}
          value={selectedDifficulty}
          name={s042}
          checked={easySelected}
        />
        <label className={easySelected ? c044 : c045}>{s044}</label>
      </div>
      <div
        className={mediumSelected ? c042 : c043}
        onClick={() => setSelectedDifficulty(s006)}
      >
        <input
          className={c046}
          type={s041}
          value={selectedDifficulty}
          name={s042}
          checked={mediumSelected}
        />
        <label className={mediumSelected ? c044 : c045}>{s045}</label>
      </div>
      <div
        className={hardSelected ? c042 : c043}
        onClick={() => setSelectedDifficulty(s007)}
      >
        <input
          className={c046}
          type={s041}
          value={selectedDifficulty}
          name={s042}
          checked={hardSelected}
        />
        <label className={hardSelected ? c044 : c045}>{s046}</label>
      </div>
    </div>
  );
}

export default GameDifficulty;
