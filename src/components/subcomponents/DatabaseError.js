import React from "react";

function DatabaseError({ backButtonPressed }) {
  return (
    <div className="gameOptions maxWidth90">
      <div className="whiteTitle profile__error">
        The database is temporarily offline for maintainence
        <br />
        <br />
        Should be back online tomorrow.
      </div>
      <button onClick={backButtonPressed} className="gameBody__button">
        Back
      </button>
    </div>
  );
}

export default DatabaseError;
