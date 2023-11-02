import { useState } from "react";
import Input from "../common/inputs/Input";
import Button from "../common/inputs/Button";

const AuthForm = () => {
  const [name, setName] = useState("");
  const [emailIsActive, setEmailIsActive] = useState(true);
  const [isContinue, setIsContinue] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleNameClear = () => {
    setName("");
  };
  const continueHandler = () => {
    if (name) {
      setIsContinue(true);
      setError("");
    } else {
      setError("Please fill the input field");
    }
  };
  return (
    <form className="relative">
      {/* Continue */}
      {!isContinue ? (
        <>
          <p
            className="text-small underline text-[#202020] absolute right-0 cursor-pointer"
            onClick={() => setEmailIsActive(!emailIsActive)}
          >
            {emailIsActive ? "Try mobile number" : "Try email"}
          </p>
          {emailIsActive ? (
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email address ..."
              value={name}
              onChange={handleNameChange}
              onClear={handleNameClear}
            />
          ) : (
            <Input
              label="Number"
              type="number"
              placeholder="Enter your number"
              value={name}
              onChange={handleNameChange}
              onClear={handleNameClear}
            />
          )}
          {error && (
            <p className="text-small text-[#ff0000] translate-y-[-12px]">
              {error}
            </p>
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
              value={name}
              onChange={handleNameChange}
              onClear={handleNameClear}
            />
          ) : (
            <Input
              label="Number"
              type="number"
              placeholder="Enter your number"
              value={name}
              onChange={handleNameChange}
              onClear={handleNameClear}
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
