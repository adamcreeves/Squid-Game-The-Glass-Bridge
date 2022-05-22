import React from "react";
import { c023 } from "../../resources/ClassNames";
import { s026, s027, s028, s029 } from "../../resources/Strings";

function DatabaseError({ backButtonPressed }) {
  return (
    <div className={s028}>
      <div className={s029}>
        {s026}
        <br />
        <br />
        {s027}
      </div>
      <button onClick={backButtonPressed} className={c023}>
        {s028}
      </button>
    </div>
  );
}

export default DatabaseError;
