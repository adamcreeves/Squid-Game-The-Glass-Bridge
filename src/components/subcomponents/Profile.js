import React, { useEffect, useState } from "react";
import Title from "./Title";
import Loader from "./Loader";
import { gamePiecesArray } from "../../utils";
import Cookies from "universal-cookie";
import DatabaseError from "./DatabaseError";

function Profile({
  player,
  setShowProfile,
  setShowAudioPlayer,
  playerProfile,
}) {
  setShowAudioPlayer(false);
  const cookies = new Cookies();
  const updatedProfile = cookies.get("playerProfile") || playerProfile;
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
  const databaseError = totalGamesPlayed === "0";

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
    return <Loader />;
  }

  return (
    <>
      <Title classNm={"title"} str={"Player Profile"} />
      <div className="gameBody">
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
          className="gameBody__button"
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
