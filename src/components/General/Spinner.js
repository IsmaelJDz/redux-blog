import React from "react";
import "../../css/spinner.css";

export const Spinner = () => {
  return (
    <div className="center">
      <div className="lds-heart">
        <div></div>
      </div>
    </div>
  );
};
