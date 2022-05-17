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
      <div className="gameWinners__list">No one has beat this mode yet</div>
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
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
              ": " +
              addZeroToNum +
              doc.data().difficultyWon.hard +
              "x*",
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
              ": " +
              addZeroToNum +
              doc.data().difficultyWon.medium +
              "x*",
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
              ": " +
              addZeroToNum +
              doc.data().difficultyWon.easy +
              "x*",
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
          parseInt(b.charAt(b.length - 3) + b.charAt(b.length - 2)) -
          parseInt(a.charAt(a.length - 3) + a.charAt(a.length - 2))
      )
      .filter((a) => a !== "")
      .map((winner) =>
        winner.charAt(winner.length - 3) === "0"
          ? winner.split("0").join("")
          : winner
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

  return (
    <>
      <Title str={"All Game Winners"} classNm={"title"} />
      <div className="gameOptions gameWinners">
        <div>
          <Title str={"Hard mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {winnersHard
              ? sortedWinnersList(winnersHard)
              : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={"Medium mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {winnersMedium
              ? sortedWinnersList(winnersMedium)
              : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={"Easy mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {winnersEasy
              ? sortedWinnersList(winnersEasy)
              : winnersListDefault()}
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
