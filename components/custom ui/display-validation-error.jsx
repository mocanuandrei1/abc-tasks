import React from "react";

export const DisplayValidationError = ({ value }) => {
  console.log(value);

  if (value && value._errors) {
    return <p className="text-red-500">{value._errors[0]}</p>;
  } else {
    return null;
  }
};
