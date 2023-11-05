import axios from "axios";
import React from "react";
import { useState } from "react";
import { MyTextInput } from "../common/inputs/Input";
import Button from "../common/inputs/Button";
import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { baseURL } from "../common/utils/URL";

const AuthForm = () => {
  const [emailIsActive, setEmailIsActive] = useState(true);
  const [isContinue, setIsContinue] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [authData, setAuthData] = useState({
    session: "",
    username: "",
  });

  const handleApiCall = async (url, data, successCallback) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, data);

      if (response.status === 200) {
        successCallback(response.data);
        setError("");
      } else {
        // Handle unexpected status codes or errors
        console.error("Unexpected response status:", response.status);
        setError("Unexpected error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      // here need to generate relevant error message
      setError(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const continueHandler = (values) => {
    const url = `${baseURL}/dev/auth/authentication/signin-passwordless`;
    const data = {
      emailOrPhone: emailIsActive ? values.email : values.number,
      medium: emailIsActive ? "email" : "phone",
    };

    handleApiCall(url, data, (responseData) => {
      setIsContinue(true); // next step will occur
      setAuthData({
        session: responseData.data.Session,
        username: responseData.data.ChallengeParameters.USERNAME,
      });
    });
  };

  const loginHandler = (values) => {
    const url = `${baseURL}/dev/auth/authentication/otp-passwordless`;
    const data = {
      challengeName: "CUSTOM_CHALLENGE",
      otp: values.code,
      session: authData.session,
      username: authData.username,
    };

    handleApiCall(url, data, (responseData) => {
      localStorage.setItem("accessToken", responseData.data.accessToken);
      window.location.href = "/";
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          email: emailIsActive ? "" : "",
          number: emailIsActive ? "" : "",
          code: "",
        }}
        validationSchema={Yup.object({
          code: Yup.string()
            .matches(/^[0-9]{6}$/, "Must be exactly 6 digits long")
            .required("Required"),
          email: emailIsActive
            ? Yup.string().email("Invalid email address").required("Required")
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
        onSubmit={(values, { setSubmitting }) => {
          // Continue with your form submission logic
          console.log("values", values);
          loginHandler(values);

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
          <Form className="flex flex-col items-center gap-4">
            {emailIsActive ? (
              <MyTextInput
                label="Email "
                name="email"
                type="email"
                placeholder="Enter your email address ..."
                identifire={isContinue ? null : "Try mobile number"}
                onclick={() => setEmailIsActive(!emailIsActive)}
                error={error}
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
                error={error}
                disabled={isContinue}
              />
            )}

            {!isContinue ? (
              <>
                <Button
                  onClick={() => {
                    continueHandler(values);
                  }}
                  loading={isLoading}
                  className="w-full"
                >
                  Continue with {emailIsActive ? "email" : "Number"}
                </Button>
              </>
            ) : (
              <>
                <p className="text-small text-center text-secondary px-10 2xl:mb-8 mb-0 translate-y-[-8px] 2xl:translate-y-0">
                  We just sent a temporary sign up code/Link. Please check your
                  inbox and paste sign up code below.
                </p>

                <MyTextInput
                  label="Sign up code"
                  name="code"
                  type="string"
                  placeholder="Enter your code"
                  error={error}
                />
                <Button loading={isLoading} type="submit" className="w-full">
                  Log in
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
