import React, { useEffect, useState } from "react";
import Title from "./Title";
import Loader from "./Loader";
import { gamePiecesArray } from "../../utils";
import Cookies from "universal-cookie";
import DatabaseError from "./DatabaseError";
import {
  s014,
  s037,
  s040,
  s061,
  s062,
  s064,
  s065,
  s066,
  s067,
  s068,
  s069,
} from "../../resources/Strings";
import {
  c012,
  c013,
  c021,
  c023,
  c058,
  c061,
  c062,
  c063,
  c064,
  c065,
} from "../../resources/ClassNames";

function Profile({
  player,
  setShowProfile,
  setShowAudioPlayer,
  playerProfile,
}) {
  setShowAudioPlayer(false);
  const cookies = new Cookies();
  const updatedProfile = cookies.get(s014) || playerProfile;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  const playerNameDisplay = updatedProfile.name || player;
  const gamesPlayedEasy = updatedProfile.difficultyPlayed?.easy;
  const gamesWonEasy = updatedProfile.difficultyWon?.easy;
  const gamesPlayedMedium = updatedProfile.difficultyPlayed?.medium;
  const gamesWonMedium = updatedProfile.difficultyWon?.medium;
  const gamesPlayedHard = updatedProfile.difficultyPlayed?.hard;
  const gamesWonHard = updatedProfile.difficultyWon?.hard;
  const totalGamesPlayed = updatedProfile.gamesPlayed;
  const databaseError = totalGamesPlayed === s037;

  if (databaseError) {
    return (
      <DatabaseError
        backButtonPressed={() => {
          setShowProfile(false);
          setShowAudioPlayer(true);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className={c012}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Title classNm={c013} str={s040} />
      <div className={c021}>
        <img
          className={c061}
          src={gamePiecesArray[updatedProfile.gamePiece]}
          alt={s061}
        />
        <Title classNm={c062} str={playerNameDisplay} />
        <div className={c063}>
          <div className={c064}>
            <div className={c065}>{s064 + s066}</div>
            <div className={c065}>{gamesPlayedEasy}</div>
          </div>
          <div className={c064}>
            <div className={c065}>{s065 + s066}</div>
            <div className={c065}>{gamesWonEasy}</div>
          </div>
          <div className={c064}>
            <div className={c065}>{s064 + s067}</div>
            <div className={c065}>{gamesPlayedMedium}</div>
          </div>
          <div className={c064}>
            <div className={c065}>{s065 + s067}</div>
            <div className={c065}>{gamesWonMedium}</div>
          </div>
          <div className={c064}>
            <div className={c065}>{s064 + s068}</div>
            <div className={c065}>{gamesPlayedHard}</div>
          </div>
          <div className={c064}>
            <div className={c065}>{s065 + s068}</div>
            <div className={c065}>{gamesWonHard}</div>
          </div>
          <div className={c064}>
            <div className={c065}>{s069}</div>
            <div className={c065}>{totalGamesPlayed}</div>
          </div>
        </div>
        <button
          className={c023}
          onClick={() => {
            setShowProfile(false);
            setShowAudioPlayer(true);
          }}
        >
          <label className={c058}>{s062}</label>
        </button>
      </div>
    </>
  );
}

export default Profile;
