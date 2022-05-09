import React, { useState, useEffect } from "react";
import Body from "../components/Body";
import Splash from "../components/Splash";
import "../styles/Main.css";

function App() {
  const [appStart, setAppStart] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppStart(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return appStart ? <Splash /> : <Body />;
}

export default App;
