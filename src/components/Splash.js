import React from "react";
import { c001, c002, c003, c004 } from "../resources/ClassNames";
import { s001, s002 } from "../resources/Strings";
import Loader from "./subcomponents/Loader";
import Title from "./subcomponents/Title";

function Splash() {
  return (
    <>
      <div className={c001}>
        <div className={c002}>
          <Title str={s001} classNm={c003} />
          <Title str={s002} classNm={c004} />
        </div>
        <Loader />
      </div>
    </>
  );
}

export default Splash;
