import React from "react";
import Logo from "../../ui/Logo/Logo";
import Button from "../../ui/Button/Button";
import css from "./Header.module.scss";
import { getToken } from "../../../helpers/api/api";

const Header = () => {
  return (
    <header className={css.header}>
      <Logo />
      <div className={css.buttonsWrapper}>
        <Button func={() => console.log("successful")} text="Users" />
        <Button func={async () => await getToken()} text="Sign up" />
      </div>
    </header>
  );
};

export default Header;
