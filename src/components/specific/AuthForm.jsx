import axios from "axios";
import React from "react";
import { useState } from "react";
import Input from "../common/inputs/Input";
import Button from "../common/inputs/Button";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(null);

  const [emailIsActive, setEmailIsActive] = useState(true);
  const [isContinue, setIsContinue] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [authData, setAuthData] = useState({
    session: "",
    username: "",
  });

  const verifyIdentity = async () => {
    try {
      const url =
        "https://vg30a7so1g.execute-api.us-west-2.amazonaws.com/dev/auth/authentication/signin-passwordless";
      const data = {
        emailOrPhone: emailIsActive ? email : number,
        medium: emailIsActive ? "email" : "phone",
      };
      const response = await axios.post(url, data);

      // Handle the response as needed
      setIsContinue(true);
      setError("");
      setAuthData({
        session: response.data.data.Session,
        username: response.data.data.ChallengeParameters.USERNAME,
      });
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setError(error.response.data.message || "something went wrong");
    }
  };

  const continueHandler = () => {
    if (email || number) {
      verifyIdentity();
      return;
    }
    setError("Please fill the input field");
  };

  const logIn = async () => {
    try {
      const url =
        "https://vg30a7so1g.execute-api.us-west-2.amazonaws.com/dev/auth/authentication/otp-passwordless";
      console.log("authdata", authData);

      const data = {
        challengeName: "CUSTOM_CHALLENGE",
        otp: code,
        session: authData.session,
        username: authData.username,
      };

      const response = await axios.post(url, data);

      // Handle the response as needed
      console.log("Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();

    logIn();
  };

  return (
    <form className="relative" onSubmit={loginHandler}>
      {/* Continue */}
      {!isContinue ? (
        <>
          {emailIsActive ? (
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email address ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClear={() => setEmail("")}
              error={error}
              identifire={"Try mobile number"}
              onclick={() => setEmailIsActive(!emailIsActive)}
            />
          ) : (
            <Input
              label="Number"
              type="string"
              placeholder="Enter your number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onClear={() => setNumber(null)}
              identifire={"Try email"}
              onclick={() => setEmailIsActive(!emailIsActive)}
              error={error}
            />
          )}

          <Button onClick={continueHandler} className="w-full font-roboto">
            {emailIsActive ? "Continue with email" : "Continue with Number"}
          </Button>
        </>
      ) : (
        <>
          {emailIsActive ? (
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email address ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClear={() => setEmail("")}
            />
          ) : (
            <Input
              label="Number"
              type="string"
              placeholder="Enter your number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onClear={() => setNumber(null)}
            />
          )}
          <p className="text-small text-center text-secondary px-10 2xl:mb-8 mb-0 translate-y-[-8px] 2xl:translate-y-0">
            We just sent a temporary sign up code/Link. Please check your inbox
            and paste sign up code below.
          </p>

          <Input
            label="Sign up code"
            type="text"
            placeholder="Enter your code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onClear={() => setCode("")}
            // value={name}
            // onChange={handleNameChange}
            // onClear={handleNameClear}
          />

          <Button type="submit" className="w-full">
            Log in
          </Button>
        </>
      )}
    </form>
  );
};

export default AuthForm;
