import React from 'react';
import './ApplyButton.scss';

function Button({ children }) {
  return <button className="Button">{children}</button>;
}

export default Button;