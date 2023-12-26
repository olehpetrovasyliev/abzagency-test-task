import React from "react";
import svg from "../../../assets/sprite.svg";

const Logo = () => {
  return (
    <svg width={144} height={36} aria-label="logo">
      <use href={`${svg} + #icon-logo-abz-test`}></use>
    </svg>
  );
};

export default Logo;
