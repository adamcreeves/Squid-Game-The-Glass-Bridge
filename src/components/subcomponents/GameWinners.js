import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { gamePiecesArray } from "../../utils";
import Loader from "./Loader";
import Title from "./Title";

function GameWinners({ setShowGameWinners }) {
  const [loading, setLoading] = useState(true);
  const [allwinners, setAllWinners] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1250);
    return () => clearTimeout(timer);
  }, []);

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
        setAllWinners({
          easyWinners,
          mediumWinners,
          hardWinners,
        });
      });
    });

  const winnersListDefault = () => {
    return (
      <div className="gameWinners__list whiteTitle">
        No one has beat this mode yet
      </div>
    );
  };

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

  if (loading) {
    return (
      <div className={"loaderContainer"}>
        <Loader />
      </div>
    );
  }

  if (
    !allwinners.easyWinners &&
    !allwinners.mediumWinners &&
    !allwinners.hardWinners
  ) {
    return (
      <div className="gameOptions maxWidth90">
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
    sortedWinnersList(allwinners.hardWinners).length > 10
      ? sortedWinnersList(allwinners.hardWinners).slice(0, 10)
      : sortedWinnersList(allwinners.hardWinners);
  const finalWinnersListMedium =
    sortedWinnersList(allwinners.mediumWinners).length > 10
      ? sortedWinnersList(allwinners.mediumWinners).slice(0, 10)
      : sortedWinnersList(allwinners.mediumWinners);
  const finalWinnersListEasy =
    sortedWinnersList(allwinners.easyWinners).length > 10
      ? sortedWinnersList(allwinners.easyWinners).slice(0, 10)
      : sortedWinnersList(allwinners.easyWinners);

  return (
    <>
      <Title str={"Top Game Winners"} classNm={"title"} />
      <div className="gameOptions gameWinners">
        <div>
          <Title str={"Hard mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {allwinners.hardWinners
              ? finalWinnersListHard
              : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={"Medium mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {allwinners.mediumWinners
              ? finalWinnersListMedium
              : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={"Easy mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {allwinners.easyWinners
              ? finalWinnersListEasy
              : winnersListDefault()}
          </div>
        </div>
        <button
          onClick={() => setShowGameWinners(false)}
          className="gameBody__button extraHorizontalPadding"
        >
          <label className="gameWinners__buttonText">Back</label>
        </button>
      </div>
    </>
  );
}

export default GameWinners;
