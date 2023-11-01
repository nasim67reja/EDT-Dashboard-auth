import React from "react";

const Heading2 = ({ children, className, textColor }) => {
  // Combine the default styles with the design class
  const buttonStyles = `heading-secondary ${
    textColor ? `text-[${textColor}]` : "text-black"
  }
  ${className}`;
  return <h2 className={buttonStyles}>{children}</h2>;
};

export default Heading2;
