import React, { useEffect, useState } from "react";
import Title from "./Title";
import Loader from "./Loader";
import { gamePiecesArray } from "../../utils";
import Cookies from "universal-cookie";
import DatabaseError from "./DatabaseError";
import { s014, s037, s040 } from "../../resources/Strings";
import { c012, c013, c021, c023 } from "../../resources/ClassNames";

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
          className="profileIcon"
          src={gamePiecesArray[updatedProfile.gamePiece]}
          alt="Player's Game Piece"
        />
        <Title
          classNm={"title whiteTitle extraTopMargin"}
          str={playerNameDisplay}
        />
        <div className="profile__body">
          <div className="profile__bodyRow">
            <div className="whiteTitle">Games played on Easy:</div>
            <div className="whiteTitle">{gamesPlayedEasy}</div>
          </div>
          <div className="profile__bodyRow">
            <div className="whiteTitle">Games won on Easy:</div>
            <div className="whiteTitle">{gamesWonEasy}</div>
          </div>
          <div className="profile__bodyRow">
            <div className="whiteTitle">Games played on Medium:</div>
            <div className="whiteTitle">{gamesPlayedMedium}</div>
          </div>
          <div className="profile__bodyRow">
            <div className="whiteTitle">Games won on Medium:</div>
            <div className="whiteTitle">{gamesWonMedium}</div>
          </div>
          <div className="profile__bodyRow">
            <div className="whiteTitle">Games played on Hard:</div>
            <div className="whiteTitle">{gamesPlayedHard}</div>
          </div>
          <div className="profile__bodyRow">
            <div className="whiteTitle">Games won on Hard:</div>
            <div className="whiteTitle">{gamesWonHard}</div>
          </div>
          <div className="profile__bodyRow">
            <div className="whiteTitle">Total games played:</div>
            <div className="whiteTitle">{totalGamesPlayed}</div>
          </div>
        </div>
        <button
          className={c023}
          onClick={() => {
            setShowProfile(false);
            setShowAudioPlayer(true);
          }}
        >
          <label className="gameWinners__buttonText">Back to Game</label>
        </button>
      </div>
    </>
  );
}

export default Profile;
