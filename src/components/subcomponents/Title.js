import React from "react";

function Title({ str, classNm }) {
  return (
    <div className={classNm} data-testid={"title-component"}>
      {str}
    </div>
  );
}

export default Title;
