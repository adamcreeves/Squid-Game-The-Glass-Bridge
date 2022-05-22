import React from "react";
import { c033, c034, c035, c036, c037 } from "../../resources/ClassNames";
import { s029 } from "../../resources/Strings";

function Loader() {
  return (
    <div className={c033}>
      <div className={c034}>
        <div className={c035} />
        <div className={c036} />
        <div className={c037} />
      </div>
      <span>{s029}</span>
    </div>
  );
}

export default Loader;
