import * as React from "react";

const Button = props => {
  const { children, styleType = "primary" } = props;
  let cleanedProps = {};
  for (let [key, value] of Object.entries(props)) {
    if (key !== "styleType") {
      cleanedProps[key] = value;
    }
  }
  return (
    <button {...cleanedProps} className={`button button-${styleType}`}>
      {children}
    </button>
  );
};
export default Button;
