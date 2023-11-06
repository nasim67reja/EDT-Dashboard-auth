import { useField } from "formik";
import React from "react";

// This is for update formik input field
export const MyTextInput = ({
  label,
  value,
  onChange,
  onclick,
  parentDivClass,
  labelClass,
  inputClass,
  errorClass,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className={`w-full ${parentDivClass}`}>
      <label
        className={`text-standard text-secondary flex justify-between ${labelClass}`}
        htmlFor={props.id || props.name}
      >
        <span>{label}</span>
        {props.identifire && (
          <span
            className="text-small underline text-[#202020]  cursor-pointer"
            onClick={onclick}
          >
            {props.identifire}
          </span>
        )}
      </label>
      <input
        className={`w-full px-3 2xl:px-4 py-2 2xl:py-3 border border-[#DDDDE0] bg-bgPrimarys text-[#AAA] text-standard rounded-lg mt-2 focus:outline-primary ${inputClass}`}
        {...field}
        {...props}
      />

      {/* Ui error */}

      {<></>}
      {meta.touched && meta.error ? (
        <div className={`text-small text-[#ff0000] mt-1 ${errorClass}`}>
          {meta.error}
        </div>
      ) : null}

      {/* server error */}
      {!meta.error && props.error && (
        <p className={`text-small text-[#ff0000] mt-1 ${errorClass}`}>
          {props.error}
        </p>
      )}
    </div>
  );
};
