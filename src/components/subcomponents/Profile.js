import React, { useEffect, useState } from "react";
import Title from "./Title";
import Loader from "./Loader";
import { gamePiecesArray } from "../../utils";

function Profile({
  player,
  setShowProfile,
  setShowAudioPlayer,
  playerProfile,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={"loaderContainer"}>
        <Loader />
      </div>
    );
  }

  const playerNameDisplay = playerProfile.name || player;
  const gamesPlayedEasy = playerProfile.difficultyPlayed?.easy;
  const gamesWonEasy = playerProfile.difficultyWon?.easy;
  const gamesPlayedMedium = playerProfile.difficultyPlayed?.medium;
  const gamesWonMedium = playerProfile.difficultyWon?.medium;
  const gamesPlayedHard = playerProfile.difficultyPlayed?.hard;
  const gamesWonHard = playerProfile.difficultyWon?.hard;
  const totalGamesPlayed = playerProfile.gamesPlayed;

  if (totalGamesPlayed === "0") {
    return (
      <div className="gameOptions maxWidth90">
        <div className="whiteTitle profile__error">
          The database is temporarily offline for maintainence.
          <br />
          <br />
          Should be back online tomorrow.
        </div>
        <button
          className="gameBody__button"
          onClick={() => {
            setShowProfile(false);
            setShowAudioPlayer(true);
          }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Title classNm={"title"} str={"Player Profile"} />
      <div className="gameBody">
        <img
          className="profileIcon"
          src={gamePiecesArray[playerProfile.gamePiece]}
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
