import React from "react";
import Logo from "../Logo/Logo";
import Button from "./Button";
import { useGetTokenQuery } from "../../../helpers/redux/api";
import { config } from "../../../helpers/consts";

const SignUpBtn = () => {
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
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <Button func={handleSignUpClick} text="Sign up" />
      )}
    </>
  );
};

export default SignUpBtn;
