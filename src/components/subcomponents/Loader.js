import React from "react";

function Loader() {
  return (
    <div className={"loaderContainer"}>
      <div className={"loader"}>
        <div className="loader__shapes">
          <div className={"ball"} />
          <div className={"triangle"} />
          <div className={"square"} />
        </div>
        <span>{"LOADING..."}</span>
      </div>
    </div>
  );
}

export default Loader;
