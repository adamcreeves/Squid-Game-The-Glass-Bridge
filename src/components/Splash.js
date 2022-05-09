import React from "react";
import Loader from "./subcomponents/Loader";
import Title from "./subcomponents/Title";

function Splash() {
  return (
    <>
      <div className={"splash"}>
        <div className={"splash__titleContainer"}>
          <Title str={"Squid Game: Glass Bridge"} classNm={"splash__title"} />
          <Title str={"By Adam Reeves"} classNm={"splash__subtitle"} />
        </div>
        <Loader />
      </div>
    </>
  );
}

export default Splash;
