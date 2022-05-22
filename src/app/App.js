import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Body from "../components/Body";
import Splash from "../components/Splash";
import { s003 } from "../resources/Strings";
import "../styles/Main.css";
import { refreshPlayersAndWinners } from "../utils";

function App() {
  const cookies = new Cookies();
  const storedWinners = cookies.get(s003) || {};
  const [appStart, setAppStart] = useState(true);
  const [allWinners, setAllWinners] = useState(storedWinners);

  if (!Object.keys(allWinners).length) {
    refreshPlayersAndWinners(setAllWinners);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppStart(false);
    }, 2750);
    return () => clearTimeout(timer);
  }, []);

  return appStart ? (
    <Splash />
  ) : (
    <Body allWinners={allWinners} setAllWinners={setAllWinners} />
  );
}

export default App;
