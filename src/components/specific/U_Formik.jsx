import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "../common/inputs/Button";
import { AiFillCloseCircle } from "react-icons/ai";

// Without using YUP

const SignupForm = () => {
  const [emailIsActive, setEmailIsActive] = useState(true);

  const formik = useFormik({
    initialValues: {
      [emailIsActive ? "email" : "number"]: "",
    },
    validate: (values) => {
      const errors = {};

      if (emailIsActive) {
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
      } else {
        if (!values.number) {
          errors.number = "Required";
        } else if (!/^\+88\d{11}$/.test(values.number)) {
          errors.number = "Must start with +88 and be 14 characters long";
        }
      }

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center gap-4"
    >
      {emailIsActive ? (
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address ..."
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email ? <div>{formik.errors.email}</div> : null}
          identifire={"Try mobile number"}
          onclick={() => setEmailIsActive(!emailIsActive)}
        />
      ) : (
        <Input
          label="Number"
          type="string"
          name="number"
          id="number"
          placeholder="Enter your number"
          onChange={formik.handleChange}
          value={formik.values.number}
          identifire={"Try email"}
          onclick={() => setEmailIsActive(!emailIsActive)}
          error={
            formik.errors.number ? <div>{formik.errors.number}</div> : null
          }
        />
      )}

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default SignupForm;

// This is for only input
const Input = ({
  label,
  identifire,
  type,
  placeholder,
  value,
  onChange,
  onClear,
  onclick,
  error,
  id,
  ...props
}) => {
  return (
    <div className="mb-4 w-full">
      <label className="text-standard text-secondary flex justify-between">
        <span>{label}</span>
        {identifire && (
          <span
            className="text-small underline text-[#202020]  cursor-pointer"
            onClick={onclick}
          >
            {identifire}
          </span>
        )}
      </label>
      <span className="relative">
        <input
          {...props}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3 2xl:px-4 py-2 2xl:py-3 border border-[#DDDDE0] bg-bgPrimarys text-[#AAA] text-standard rounded-lg mt-2 focus:outline-primary"
        />
        {error && <p className="text-small text-[#ff0000] mt-1">{error}</p>}
        {value && onClear && (
          <button
            className="absolute top-[1px] right-5 text-gray-500 hover:text-red-500 focus:outline-none"
            onClick={onClear}
          >
            <AiFillCloseCircle className="text-[#AAA]" size={20} />
          </button>
        )}
      </span>
    </div>
  );
};
