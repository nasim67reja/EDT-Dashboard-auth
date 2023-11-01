import React from "react";

const Button = ({
  className,
  children,
  onClick,
  padding,
  backgroundColor,
  textColor,
  fontSize,
}) => {
  // Combine the default styles with the design class
  const buttonStyles = `${
    backgroundColor ? `${backgroundColor}` : "bg-primary"
  } ${textColor ? `text-[${textColor}]` : "text-[#fff]"} ${
    padding ? `p-[${padding}px]` : "p-[12px]"
  } rounded-md
  ${fontSize ? `text-[${fontSize}px]` : "text-standard"}
  ${className} `;

  return (
    <button className={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
