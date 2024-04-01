import React from "react";
import CheckboxContext from "./CheckboxContext";


function Checkbox({ children, disabled, value, checked, onChange }) {
  const context = React.useContext(CheckboxContext);

  const handleChange = (isChecked) => {
    if (onChange) {
      onChange(isChecked);
    }
  };

  if (!context) {
    return (
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={(event) => handleChange(event.target.checked)}
        />
        {children}
      </label>
    );
  }

  const { isDisabled, isChecked, toggleValue } = context;

  return (
    <label>
      <input
        type="checkbox"
        disabled={isDisabled(disabled)}
        checked={isChecked(value)}
        onChange={(event) => {
          handleChange(event.target.checked);
          toggleValue({ checked: event.target.checked, value });
        }}
      />
      {children}
    </label>
  );
}

export default Checkbox;