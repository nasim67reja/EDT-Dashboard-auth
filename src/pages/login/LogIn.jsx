import React from "react";
import city from "../../assets/city.png";
import logo from "../../assets/logo.png";
import Google from "../../assets/Google.png";
import Apple from "../../assets/Apple.png";

import Heading2 from "../../components/common/fonts/Heading2";
import Button from "../../components/common/inputs/Button";
import AuthForm from "../../components/specific/AuthForm";
import SignupForm from "./Formik";

const LogIn = () => {
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
          <Heading2 className="text-center mb-6">Welcome to abc</Heading2>
          <AuthForm />
          {/* <SignupForm /> */}

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

export default LogIn;
