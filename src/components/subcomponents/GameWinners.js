import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Loader from "./Loader";
import Title from "./Title";

function GameWinners({ setShowGameWinners }) {
  const [loading, setLoading] = useState(true);
  const [winnersHard, setWinnersHard] = useState("");
  const [winnersMedium, setWinnersMedium] = useState("");
  const [winnersEasy, setWinnersEasy] = useState("");

  const winnersListDefault = () => {
    return (
      <div className="gameWinners__list whiteTitle">
        No one has beat this mode yet
      </div>
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1250);
    return () => clearTimeout(timer);
  }, []);

  db.collection("Players")
    .get()
    .then((snapShot) => {
      let winnersArray = "";
      snapShot.forEach((doc) => {
        const addZeroToNum = doc.data().difficultyWon.easy < 10 ? "0" : "";
        if (doc.data().difficultyWon.hard > 0) {
          winnersArray += [
            doc.data().name.charAt(0).toUpperCase() +
              doc.data().name.slice(1) +
              " --> " +
              addZeroToNum +
              doc.data().difficultyWon.hard +
              "*",
          ];
        }
      });
      setWinnersHard(winnersArray);
    });

  db.collection("Players")
    .get()
    .then((snapShot) => {
      let winnersArray = "";
      snapShot.forEach((doc) => {
        const addZeroToNum = doc.data().difficultyWon.medium < 10 ? "0" : "";
        if (doc.data().difficultyWon.medium > 0) {
          winnersArray += [
            doc.data().name.charAt(0).toUpperCase() +
              doc.data().name.slice(1) +
              " --> " +
              addZeroToNum +
              doc.data().difficultyWon.medium +
              "*",
          ];
        }
      });
      setWinnersMedium(winnersArray);
    });

  db.collection("Players")
    .get()
    .then((snapShot) => {
      let winnersArray = "";
      snapShot.forEach((doc) => {
        const addZeroToNum = doc.data().difficultyWon.easy < 10 ? "0" : "";
        if (doc.data().difficultyWon.easy > 0) {
          winnersArray += [
            doc.data().name.charAt(0).toUpperCase() +
              doc.data().name.slice(1) +
              " --> " +
              addZeroToNum +
              doc.data().difficultyWon.easy +
              "*",
          ];
        }
      });
      setWinnersEasy(winnersArray);
    });

  const sortedWinnersList = (listOfWinners) =>
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
          <div className="gameWinners__listItem">{winner}</div>
        </div>
      ));

  if (loading) {
    return (
      <div className={"loaderContainer"}>
        <Loader />
      </div>
    );
  }

  if (!winnersEasy && !winnersMedium && !winnersMedium) {
    return (
      <div className="gameOptions">
        <div className="whiteTitle profile__error">
          The database is temporarily offline for maintainence
          <br />
          <br />
          Should be back online tomorrow.
        </div>
        <button
          onClick={() => setShowGameWinners(false)}
          className="gameBody__button"
        >
          Back
        </button>
      </div>
    );
  }

  const finalWinnersListHard =
    sortedWinnersList(winnersHard).length > 10
      ? sortedWinnersList(winnersHard).slice(0, 10)
      : sortedWinnersList(winnersHard);
  const finalWinnersListMedium =
    sortedWinnersList(winnersMedium).length > 10
      ? sortedWinnersList(winnersMedium).slice(0, 10)
      : sortedWinnersList(winnersMedium);
  const finalWinnersListEasy =
    sortedWinnersList(winnersEasy).length > 10
      ? sortedWinnersList(winnersEasy).slice(0, 10)
      : sortedWinnersList(winnersEasy);

  return (
    <>
      <Title str={"Top Game Winners"} classNm={"title"} />
      <div className="gameOptions gameWinners">
        <div>
          <Title str={"Hard mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {winnersHard ? finalWinnersListHard : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={"Medium mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {winnersMedium ? finalWinnersListMedium : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={"Easy mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {winnersEasy ? finalWinnersListEasy : winnersListDefault()}
          </div>
        </div>
        <button
          onClick={() => setShowGameWinners(false)}
          className="gameOptions__button"
        >
          Back
        </button>
      </div>
    </>
  );
}

export default GameWinners;
