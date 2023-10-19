import React, { useState } from "react";

export const ThemeToggle = ({ context, theme, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div onClick={handleToggle} style={{ cursor: "pointer" }}>
        {isOpen ? " - Click to close" : " - Click to open"}
      </div>
      <ul style={{ display: isOpen ? "block" : "none" }}>
        <div>{theme}</div>
        <div>{description}</div>
      </ul>
    </>
  );
}