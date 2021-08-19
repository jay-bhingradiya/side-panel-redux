import React from "react";
import { Fragment } from "react";

const FormInput = (props) => {
  const {
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    id,
    ...rest
  } = props;

  return (
    <Fragment>
      <div className="form-div">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={"form-input"}
          style={error && { border: "1px solid red" }}
          {...rest}
        />
        {error && <small style={{ color: "red" }}>{error}</small>}
      </div>
    </Fragment>
  );
};

export default FormInput;
