import React from "react";
import "../../assets/scss/ApplyButton.scss";

function Button({ children }) {
  return <button className="Button">{children}</button>;
}

export default Button;
