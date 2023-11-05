import React from "react";
import Loader from "../utils/Loader";

const Button = ({
  className,
  children,
  onClick,
  padding,
  backgroundColor,
  textColor,
  fontSize,
  type,
  loading,
}) => {
  // Combine the default styles with the design class
  const buttonStyles = `${
    backgroundColor ? `${backgroundColor}` : "bg-primary"
  } ${textColor ? `text-[${textColor}]` : "text-[#fff]"} ${
    padding ? `p-[${padding}px]` : "p-[9px] 2xl:p-[12px]"
  } rounded-md
  ${fontSize ? `text-[${fontSize}px]` : "text-standard"}
  ${className} `;

  return (
    <button
      type={type ? type : "button"}
      className={buttonStyles}
      onClick={onClick}
    >
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
