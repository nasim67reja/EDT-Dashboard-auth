import React, { useState } from "react";
import city from "../../assets/city.png";
import logo from "../../assets/logo.png";
import Google from "../../assets/Google.png";
import Apple from "../../assets/Apple.png";

import Button from "../../components/common/inputs/Button";
// import AuthForm from "../../components/specific/AuthForm";
import { baseURL } from "../../components/common/utils/URL";
import handleApiCall from "../../components/common/utils/HandleApiCall";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../../components/common/inputs/Input";

const Auth = () => {
  const [emailIsActive, setEmailIsActive] = useState(true);
  const [isContinue, setIsContinue] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [emailOrPhonError, setEmailOrPhonError] = useState("");
  const [codeError, setCodeError] = useState("");

  const [authData, setAuthData] = useState({
    session: "",
    username: "",
  });

  /// Continue with email or Phone number
  const continueHandler = (values, { setStatus, setErrors }) => {
    const url = `${baseURL}/dev/auth/authentication/signin-passwordless`;
    const data = {
      emailOrPhone: emailIsActive ? values.email : values.number,
      medium: emailIsActive ? "email" : "phone",
    };

    handleApiCall(
      url,
      data,
      (responseData) => {
        setIsContinue(true); // next step will occur
        setAuthData({
          session: responseData.data.Session,
          username: responseData.data.ChallengeParameters.USERNAME,
        });
      },
      setIsLoading,
      setEmailOrPhonError
    );
  };

  //// Actual login using the server response's code
  const loginHandler = (values) => {
    const url = `${baseURL}/dev/auth/authentication/otp-passwordless`;
    const data = {
      challengeName: "CUSTOM_CHALLENGE",
      otp: values.code,
      session: authData.session,
      username: authData.username,
    };

    handleApiCall(
      url,
      data,
      (responseData) => {
        localStorage.setItem("accessToken", responseData.data.accessToken);
        window.location.href = "/";
      },
      setIsLoading,
      setCodeError
    );
  };

  return (
    <>
      <section className="grid grid-cols-[63.2%_36.8%]">
        <img src={city} alt="" className="w-full h-screen object-cover" />
        <div className="2xl:p-[70px] p-[30px] px-[70px] h-screen overflow-y-auto">
          <div className="center">
            <img
              src={logo}
              alt=""
              className="w-[184px] h-auto 2xl:mb-[5rem] mb-[2rem]"
            />
          </div>
          <h2 className="heading-secondary text-center mb-6">Welcome to abc</h2>
          {/* <AuthForm /> */}

          {/*  */}

          <>
            <Formik
              initialValues={{
                email: emailIsActive ? "" : "",
                number: emailIsActive ? "" : "",
              }}
              validationSchema={Yup.object({
                email: emailIsActive
                  ? Yup.string()
                      .email("Invalid email address")
                      .required("Required")
                  : null,
                number: emailIsActive
                  ? null
                  : Yup.string()
                      .matches(
                        /^\+88\d{11}$/,
                        "Must start with +88 and be 14 characters long"
                      )
                      .required("Required"),
              })}
              onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
                console.log("values", values);
                continueHandler(values, { setStatus, setErrors });
                setTimeout(() => {
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                setFieldValue,
                setFieldTouched,
                setFieldError,
                values,
                errors,
                touched,
              }) => (
                <Form className="flex flex-col items-center gap-4">
                  {emailIsActive ? (
                    <MyTextInput
                      label="Email "
                      name="email"
                      type="email"
                      placeholder="Enter your email address ..."
                      identifire={isContinue ? null : "Try mobile number"}
                      onclick={() => setEmailIsActive(!emailIsActive)}
                      error={emailOrPhonError}
                      disabled={isContinue}
                    />
                  ) : (
                    <MyTextInput
                      label="Number"
                      name="number"
                      type="string"
                      placeholder="Enter your number"
                      identifire={isContinue ? null : "Try email"}
                      onclick={() => setEmailIsActive(!emailIsActive)}
                      error={emailOrPhonError}
                      disabled={isContinue}
                    />
                  )}

                  {!isContinue && (
                    <>
                      <Button
                        type="submit"
                        loading={isLoading}
                        className="w-full"
                      >
                        Continue with {emailIsActive ? "email" : "Number"}
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </>

          <>
            <Formik
              initialValues={{
                code: "",
              }}
              validationSchema={Yup.object({
                code: Yup.string()
                  .matches(/^[0-9]{6}$/, "Must be exactly 6 digits long")
                  .required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                console.log("values", values);
                loginHandler(values);
                setTimeout(() => {
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                setFieldValue,
                setFieldTouched,
                setFieldError,
                values,
                errors,
                touched,
              }) => (
                <Form className="flex flex-col items-center gap-2 mt-3">
                  {isContinue && (
                    <>
                      <p className="text-small text-center text-secondary px-10 2xl:mb-4 mb-0 translate-y-[-8px] 2xl:translate-y-0">
                        We just sent a temporary sign up code/Link. Please check
                        your inbox and paste sign up code below.
                      </p>

                      <MyTextInput
                        label="Sign up code"
                        name="code"
                        type="string"
                        placeholder="Enter your code"
                        error={codeError}
                      />
                      <Button
                        loading={isLoading}
                        type="submit"
                        className="w-full"
                      >
                        Log in
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </>
          {/*  */}
          <div className="my-[2rem] 2xl:my-[3rem] flex gap-4 items-center">
            <div className=" w-[45%] h-[1px] bg-[#AAAAAA]"></div>
            <p className="text-small text-[#777777]">Or</p>
            <div className=" w-[45%] h-[1px] bg-[#AAAAAA]"></div>
          </div>

          <div className=" flex flex-col gap-4">
            <Button
              backgroundColor="bg-bgPrimary"
              textColor="#777777"
              className="w-full font-roboto border border-[#DDDDE0]"
            >
              <div className="center gap-2">
                <span>
                  <img className="w-[20px] h-auto" src={Google} alt="" />
                </span>
                <span>Continue with google</span>
              </div>
            </Button>

            <Button
              backgroundColor="bg-bgPrimary"
              textColor="#777777"
              className="w-full font-roboto border border-[#DDDDE0]"
            >
              <div className="center gap-2">
                <span>
                  <img className="w-[20px] h-auto" src={Apple} alt="" />
                </span>
                <span>Continue with Apple</span>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
