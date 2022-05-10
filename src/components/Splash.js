import React from "react";
import Loader from "./subcomponents/Loader";
import Title from "./subcomponents/Title";

function Splash() {
  return (
    <>
      <div className={"splash"}>
        <div className={"splash__titleContainer"}>
          <Title str={"SQUID GAME: GLASS BRIDGE"} classNm={"splash__title"} />
          <Title str={"By Adam Reeves"} classNm={"splash__subtitle"} />
        </div>
        <Loader />
      </div>
    </>
  );
}

export default Splash;
