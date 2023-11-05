import React, { useState } from "react";
import { useFormik } from "formik";
import Input from "../../components/common/inputs/Input";
import Button from "../../components/common/inputs/Button";

// const validate = (values) => {
//   const errors = {};

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   if (!values.number) {
//     errors.number = "Required";
//   } else if (!/^\+88\d{11}$/.test(values.number)) {
//     errors.number = "Must start with +88 and be 14 characters long";
//   }

//   return errors;
// };

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
