import { forwardRef } from "react";

const Select = forwardRef(
  (
    { label, id, name, size, item, value, options, onChange, error, ...props },
    ref
  ) => {
    const shouldRenderErrorPlaceholder = id !== "regionId";
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <select
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          size={size}
          ref={ref}
          error={error}
          {...props}
        >
          <option value="">{item}</option> {/* 使用空字符串作為預設選項的值 */}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {shouldRenderErrorPlaceholder && (
          <div className="errorPlaceholder">
            {error && <p className="error">{error}</p>}
          </div>
        )}
      </>
    );
  }
);

export default Select;
