import { useField } from "formik";
import React from "react";

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
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
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
      {meta.touched && meta.error ? (
        <div className={`text-small text-[#ff0000] mt-1 ${errorClass}`}>
          {meta.error}
        </div>
      ) : null}

      {/* server error */}
      {props.error && (
        <p className={`text-small text-[#ff0000] mt-1 ${errorClass}`}>
          {props.error}
        </p>
      )}
    </div>
  );
};
