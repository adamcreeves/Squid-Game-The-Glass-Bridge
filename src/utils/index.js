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
