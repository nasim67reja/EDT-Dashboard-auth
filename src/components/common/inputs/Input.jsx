import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

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
}) => {
  return (
    <div className="mb-4">
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
          required
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

export default Input;
