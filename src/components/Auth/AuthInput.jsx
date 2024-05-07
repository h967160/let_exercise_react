import "@/styles/reset.scss";
import "@/styles/base.scss";
import styles from "./AuthInput.module.scss";

const AuthInput = ({
  label,
  type,
  value,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <>
      <label className={styles.label}>
        {label}
        {required && <span>*</span>}
      </label>
      <input
        className={styles.input}
        type={type || "text"}
        value={value}
        placeholder={placeholder || ""}
        onChange={(event) => onChange?.(event.target.value)}
        required={required}
      />
    </>
  );
};

export default AuthInput;
