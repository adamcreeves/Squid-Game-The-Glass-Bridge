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

export const getDBShapshot = (collectionName) => {
  const cookies = new Cookies();
  const dbSnapshot = db
    .collection(collectionName)
    .get()
    .then((snapShot) => snapShot);
  cookies.set("dbSnapshot", dbSnapshot, { path: "/" });
  return dbSnapshot;
};

export const getAllPlayers = (snapShot) => {
  let allPlayers = [];
  snapShot.forEach((doc) => allPlayers.push(doc));
  return allPlayers;
};

export const getAllWinners = (allPlayers) => {
  const cookies = new Cookies();
  let hardWinners = "";
  let mediumWinners = "";
  let easyWinners = "";
  allPlayers.forEach((doc) => {
    let addZeroToNum = "";
    const hasPic = doc.data().gamePiece ? doc.data().gamePiece : "";
    if (doc.data().difficultyWon.hard > 0) {
      addZeroToNum = doc.data().difficultyWon.hard < 10 ? "0" : "";
      hardWinners +=
        hasPic +
        doc.data().name.charAt(0).toUpperCase() +
        doc.data().name.slice(1) +
        " --> " +
        addZeroToNum +
        doc.data().difficultyWon.hard +
        "*";
    }
    if (doc.data().difficultyWon.medium > 0) {
      addZeroToNum = doc.data().difficultyWon.medium < 10 ? "0" : "";
      mediumWinners +=
        hasPic +
        doc.data().name.charAt(0).toUpperCase() +
        doc.data().name.slice(1) +
        " --> " +
        addZeroToNum +
        doc.data().difficultyWon.medium +
        "*";
    }
    if (doc.data().difficultyWon.easy > 0) {
      addZeroToNum = doc.data().difficultyWon.easy < 10 ? "0" : "";
      const hasPic = doc.data().gamePiece ? doc.data().gamePiece : "";
      easyWinners +=
        hasPic +
        doc.data().name.charAt(0).toUpperCase() +
        doc.data().name.slice(1) +
        " --> " +
        addZeroToNum +
        doc.data().difficultyWon.easy +
        "*";
    }
  });
  const allWinners = {
    easyWinners,
    mediumWinners,
    hardWinners,
  };
  cookies.set("allWinners", allWinners, { path: "/" });
  return allWinners;
};

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
      });
      const allWinners = {
        easyWinners,
        mediumWinners,
        hardWinners,
      };
      cookies.set("allWinners", allWinners, { path: "/" });
      setAllWinners(allWinners);
    });
};

export const playerWonForDBUpdate = (
  player,
  difficulty,
  wonTheGame,
  playingAgain,
  playerProfile
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
    const cookies = new Cookies();
    const localProfile = cookies.get("playerProfile") || playerProfile;
    lookupNameInDatabase.get().then((doc) => {
      if (doc.exists) {
        batch.update(lookupNameInDatabase, localProfile);
        batch.commit();
      }
    });
  }
};

export const sortedWinnersList = (listOfWinners) =>
  listOfWinners
    .split("*")
    .sort(
      (a, b) =>
        parseInt(b.charAt(b.length - 2) + b.charAt(b.length - 1)) -
        parseInt(a.charAt(a.length - 2) + a.charAt(a.length - 1))
    )
    .filter((a) => a !== "")
    .map((winner) =>
      winner.charAt(winner.length - 2) === "0" &&
      winner.charAt(winner.length - 1) === "1"
        ? winner.split("0").join("") + " win"
        : winner.charAt(winner.length - 2) === "0"
        ? winner.split("0").join("") + " wins"
        : winner + " wins"
    )
    .map((winner, index) => (
      <div className="gameWinners__listRow">
        <div className="gameWinners__listItem">
          {index + 1}
          {") "}
        </div>
        <img
          className="gameWinners__playerIcon"
          src={gamePiecesArray[parseInt(winner.charAt(0), 0) || 0]}
          alt="players last game piece"
        />
        <div className="gameWinners__listItem">
          {new RegExp(`^[0-9]`).test(winner) ? winner.slice(1) : winner}
        </div>
      </div>
    ));
