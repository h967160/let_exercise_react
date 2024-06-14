// const TextArea = ({ id, name, label, placeholder, onChange, value }) => {
//   return (
//     <>
//       <label htmlFor={id}>{label}</label>
//       <textarea
//         id={id}
//         name={name}
//         placeholder={placeholder}
//         onChange={onChange}
//         value={value}
//       ></textarea>
//     </>
//   );
// };

// export default TextArea;

import { forwardRef } from "react";
const TextArea = forwardRef(
  ({ id, name, placeholder, value, label, onChange, error, ...props }, ref) => {
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <textarea
          id={id}
          name={name}
          placeholder={placeholder || ""}
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

export default TextArea;
