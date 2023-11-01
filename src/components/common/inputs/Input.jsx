import React from "react";

const Input = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-standard text-secondary ">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#DDDDE0] bg-bgPrimarys text-[#AAA] text-standard rounded-lg mt-2"
      />
    </div>
  );
};

export default Input;
