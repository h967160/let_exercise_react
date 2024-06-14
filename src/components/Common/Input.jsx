import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type,
      id,
      value,
      name,
      placeholder,
      error,
      onChange = () => {},
      ...props
    },
    ref
  ) => {
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          error={error}
          {...props}
        />
        <div className="errorPlaceholder">
          {error && <p className="error">{error}</p>}
        </div>
      </>
    );
  }
);

export default Input;
