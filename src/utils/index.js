import Cookies from "universal-cookie";
import { db } from "../firebase";

export const generateAnswersForBoard = (numberOfMoves) => {
  let answersArray = [];
  for (let i = 0; i < numberOfMoves; i++) {
    answersArray.push(Math.floor(Math.random() * 2));
  }
  return answersArray;
};

export const gamePiecesArray = [
  "/playerA.png",
  "/playerB.png",
  "/playerC.png",
  "/playerD.png",
  "/playerE.png",
  "/playerF.png",
  "/playerG.png",
  "/playerH.png",
  "/playerI.png",
];

export const refreshPlayersAndWinners = (setAllWinners) => {
  const cookies = new Cookies();
  db.collection("Players")
    .get()
    .then((snapShot) => {
      let hardWinners = "";
      let mediumWinners = "";
      let easyWinners = "";
      snapShot.forEach((doc) => {
        let addZeroToNum = "";
        const hasPic = doc.data().gamePiece ? doc.data().gamePiece : "";
        if (doc.data().difficultyWon.hard > 0) {
          addZeroToNum = doc.data().difficultyWon.hard < 10 ? "0" : "";
          hardWinners += [
            hasPic +
              doc.data().name.charAt(0).toUpperCase() +
              doc.data().name.slice(1) +
              " --> " +
              addZeroToNum +
              doc.data().difficultyWon.hard +
              "*",
          ];
        }
        if (doc.data().difficultyWon.medium > 0) {
          addZeroToNum = doc.data().difficultyWon.medium < 10 ? "0" : "";
          mediumWinners += [
            hasPic +
              doc.data().name.charAt(0).toUpperCase() +
              doc.data().name.slice(1) +
              " --> " +
              addZeroToNum +
              doc.data().difficultyWon.medium +
              "*",
          ];
        }
        if (doc.data().difficultyWon.easy > 0) {
          addZeroToNum = doc.data().difficultyWon.easy < 10 ? "0" : "";
          const hasPic = doc.data().gamePiece ? doc.data().gamePiece : "";
          easyWinners += [
            hasPic +
              doc.data().name.charAt(0).toUpperCase() +
              doc.data().name.slice(1) +
              " --> " +
              addZeroToNum +
              doc.data().difficultyWon.easy +
              "*",
          ];
        }
        const allWinners = {
          easyWinners,
          mediumWinners,
          hardWinners,
        };
        cookies.set("allWinners", allWinners, { path: "/" });
        setAllWinners(allWinners);
      });
    });
};

export const playerWonForDBUpdate = (
  player,
  difficulty,
  wonTheGame,
  playingAgain
) => {
  const batch = db.batch();
  const lookupNameInDatabase = db
    .collection("Players")
    .doc(player.toLowerCase());

  if (wonTheGame) {
    lookupNameInDatabase.get().then((doc) => {
      if (doc.exists) {
        let updateDifficultyWon;
        let updateDifficultiesPlayed;
        if (difficulty === "hard") {
          updateDifficultyWon = {
            ...doc.data().difficultyWon,
            hard: doc.data().difficultyWon.hard + 1,
          };
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            hard: doc.data().difficultyPlayed.hard + 1,
          };
        } else if (difficulty === "medium") {
          updateDifficultyWon = {
            ...doc.data().difficultyWon,
            medium: doc.data().difficultyWon.medium + 1,
          };
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            medium: doc.data().difficultyPlayed.medium + 1,
          };
        } else {
          updateDifficultyWon = {
            ...doc.data().difficultyWon,
            easy: doc.data().difficultyWon.easy + 1,
          };
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            easy: doc.data().difficultyPlayed.easy + 1,
          };
        }
        const updatedPlayerData = playingAgain
          ? {
              ...doc.data(),
              difficultyWon: updateDifficultyWon,
              difficultyPlayed: updateDifficultiesPlayed,
              gamesPlayed: doc.data().gamesPlayed + 1,
            }
          : { ...doc.data(), difficultyWon: updateDifficultyWon };

        batch.update(lookupNameInDatabase, updatedPlayerData);
        batch.commit();
      }
    });
  } else {
    lookupNameInDatabase.get().then((doc) => {
      if (doc.exists) {
        let updateDifficultiesPlayed;
        const updateGamesPlayed = doc.data().gamesPlayed + 1;
        if (difficulty === "hard") {
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            hard: doc.data().difficultyPlayed.hard + 1,
          };
        } else if (difficulty === "medium") {
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
        const updatedPlayerData = {
          ...doc.data(),
          difficultyPlayed: updateDifficultiesPlayed,
          gamesPlayed: updateGamesPlayed,
        };
        batch.update(lookupNameInDatabase, updatedPlayerData);
        batch.commit();
      }
    });
  }
};
