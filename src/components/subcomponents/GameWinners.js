import React, { useEffect, useState } from "react";
import {
  c012,
  c013,
  c053,
  c054,
  c055,
  c056,
  c057,
  c058,
  c059,
} from "../../resources/ClassNames";
import {
  s051,
  s052,
  s053,
  s054,
  s055,
  s056,
  s057,
} from "../../resources/Strings";
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
    return <div className={c053}>{s051}</div>;
  };

  const handleBackBtnPress = () => setShowGameWinners(false);

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
      <div className={c012}>
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
      <Title str={s052} classNm={c013} />
      <div className={c055}>
        <div className={c057}>
          <button onClick={handleBackBtnPress} className={c054}>
            <label className={c058}>{s053}</label>
          </button>
          {!refreshed && (
            <button onClick={refreshButtonPressed} className={c054}>
              <label className={c058}>{s054}</label>
            </button>
          )}
        </div>
        <div>
          <Title str={s055} classNm={c056} />
          <div className={c059}>
            {displayedWinners.hardWinners
              ? finalWinnersListHard
              : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={s056} classNm={c056} />
          <div className={c059}>
            {displayedWinners.mediumWinners
              ? finalWinnersListMedium
              : winnersListDefault()}
          </div>
        </div>
        <div>
          <Title str={s057} classNm={c056} />
          <div className={c059}>
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
