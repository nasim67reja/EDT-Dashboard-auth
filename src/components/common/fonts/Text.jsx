import React from "react";

const Text = ({
  designClass,
  children,
  onClick,
  padding,
  backgroundColor,
  textColor,
  fontSize,
}) => {
  // Combine the default styles with the design class
  const buttonStyles = `${
    backgroundColor ? `bg-[${backgroundColor}]` : "bg-primary"
  } ${textColor ? `text-[${textColor}]` : "text-[#fff]"} ${
    padding ? `p-[${padding}px]` : "p-[12px]"
  } rounded-md
  ${fontSize ? `text-[${fontSize}px]` : "text-[16px]"}
  ${designClass}`;

  return (
    <p className={buttonStyles}>
      {children}
    </p>
  );
};

export default Text;
