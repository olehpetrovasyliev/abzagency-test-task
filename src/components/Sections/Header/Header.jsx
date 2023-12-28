import React from "react";
import Logo from "../../ui/Logo/Logo";
import Button from "../../ui/Button/Button";
import css from "./Header.module.scss";
import { useGetTokenQuery } from "../../../helpers/redux/api";
import { config } from "../../../helpers/config";
import SignUpBtn from "../../ui/Button/SignUpBtn";

const Header = () => {
  const { isLoading, data, error } = useGetTokenQuery();
  const handleSignUpClick = async () => {
    try {
      config.token = data.token;
      console.log(config);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  return (
    <header className={css.header}>
      <Logo />
      <div className={css.buttonsWrapper}>
        <Button func={() => console.log("successful")} text="Users" />
        <SignUpBtn />
      </div>
      {error && <p>{error}</p>}
    </header>
  );
};

export default Header;
