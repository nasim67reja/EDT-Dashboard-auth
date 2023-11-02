import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const Input = ({ label, type, placeholder, value, onChange, onClear }) => {
  return (
    <div className="mb-4">
      <label className="text-standard text-secondary ">{label}</label>
      <span className="relative">
        <input
          required
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3 2xl:px-4 py-2 2xl:py-3 border border-[#DDDDE0] bg-bgPrimarys text-[#AAA] text-standard rounded-lg mt-2 focus:outline-primary"
        />
        {value && onClear && (
          <button
            className="absolute top-[2px] right-5 text-gray-500 hover:text-red-500 focus:outline-none"
            onClick={onClear}
          >
            <AiFillCloseCircle className="text-gray-600" />
          </button>
        )}
      </span>
    </div>
  );
};

export default Input;
