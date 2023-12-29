import React from "react";
import svg from "../../assets/sprite.svg";

const SuccessMessage = () => {
  return (
    <div>
      <h1>User successfully registered</h1>
      <svg max-width={328} height={290}>
        <use href={`${svg}#icon-success-image`}></use>
      </svg>
    </div>
  );
};

export default SuccessMessage;
