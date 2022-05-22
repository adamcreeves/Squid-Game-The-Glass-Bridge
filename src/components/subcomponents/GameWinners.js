import React, { useEffect, useState } from "react";
import { refreshPlayersAndWinners, sortedWinnersList } from "../../utils";
import DatabaseError from "./DatabaseError";
import Loader from "./Loader";
import Title from "./Title";

function GameWinners({ setShowAudioPlayer, setShowGameWinners, allWinners }) {
  setShowAudioPlayer(false);
  const [loading, setLoading] = useState(true);
  const [displayedWinners, setDisplayedWinners] = useState(allWinners);
  const [refreshed, setRefreshed] = useState(false);

  const databaseError =
    !displayedWinners.easyWinners &&
    !displayedWinners.mediumWinners &&
    !displayedWinners.hardWinners;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1250);
    return () => clearTimeout(timer);
  }, []);

  const winnersListDefault = () => {
    return (
      <div className="gameWinners__list whiteTitle">
        No one has beat this mode yet
      </div>
    );
  };

  const refreshButtonPressed = () => {
    if (!refreshed) {
      setLoading(true);
      const timer = setTimeout(() => {
        refreshPlayersAndWinners(setDisplayedWinners);
        setLoading(false);
        setRefreshed(true);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
    return null;
  };

  if (loading) {
    return (
      <div className={"loaderContainer"}>
        <Loader />
      </div>
    );
  }

  if (databaseError) {
    <DatabaseError backButtonPressed={() => setShowGameWinners(false)} />;
  }

  const finalWinnersListHard =
    sortedWinnersList(displayedWinners.hardWinners).length > 10
      ? sortedWinnersList(displayedWinners.hardWinners).slice(0, 10)
      : sortedWinnersList(displayedWinners.hardWinners);
  const finalWinnersListMedium =
    sortedWinnersList(displayedWinners.mediumWinners).length > 10
      ? sortedWinnersList(displayedWinners.mediumWinners).slice(0, 10)
      : sortedWinnersList(displayedWinners.mediumWinners);
  const finalWinnersListEasy =
    sortedWinnersList(displayedWinners.easyWinners).length > 10
      ? sortedWinnersList(displayedWinners.easyWinners).slice(0, 10)
      : sortedWinnersList(displayedWinners.easyWinners);

  return (
    <>
      <Title str={"Top Game Winners"} classNm={"title"} />
      <div className="gameOptions gameWinners">
        <div className="gameWinners__buttonsRow">
          <button
            onClick={() => setShowGameWinners(false)}
            className="gameBody__button extraHorizontalPadding"
          >
            <label className="gameWinners__buttonText">Back to Menu</label>
          </button>
          {!refreshed && (
            <button
              onClick={refreshButtonPressed}
              className="gameBody__button extraHorizontalPadding"
            >
              <label className="gameWinners__buttonText">Refresh</label>
            </button>
          )}
        </div>
        <div>
          <Title str={"Hard mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {displayedWinners.hardWinners
              ? finalWinnersListHard
              : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={"Medium mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {displayedWinners.mediumWinners
              ? finalWinnersListMedium
              : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={"Easy mode"} classNm={"title whiteTitle"} />
          <div className="gameWinners__list">
            {displayedWinners.easyWinners
              ? finalWinnersListEasy
              : winnersListDefault()}
          </div>
        </div>
      </div>
    </>
  );
}

export default GameWinners;
