import "@/styles/reset.scss";
import "@/styles/base.scss";
import styles from "./AuthInput.module.scss";
import { forwardRef } from "react";

const AuthInput = forwardRef(
  (
    {
      label,
      type,
      placeholder,
      required,
      id,
      error,
      responseError,
      onChange = () => {},
      ...props
    },
    ref
  ) => {
    let isAccountExist =
      responseError?.includes("帳號不存在") && id === "account";

    let isAccountOrPasswordError =
      responseError?.includes("錯誤") &&
      (id === "account" || id === "password");
    return (
      <>
        <label className={styles.label}>
          {label}
          {required && <span>*</span>}
        </label>
        <input
          className={`${styles.input} ${
            responseError || error ? styles.inputError : ""
          }`}
          type={type || "text"}
          id={id}
          placeholder={placeholder || ""}
          ref={ref}
          required={required}
          onChange={onChange}
          responseError={responseError}
          {...props}
        />
        {/* 如果是帳號不存在錯誤，則顯示錯誤訊息 */}
        {isAccountExist && <p className={styles.error}>{responseError}</p>}
        {/* 如果是帳號或密碼錯誤，則顯示錯誤訊息 */}
        {isAccountOrPasswordError && (
          <p className={styles.error}>{responseError}</p>
        )}
        {/* 沒有後端回應訊息則顯示錯誤訊息 */}
        {!isAccountExist && !isAccountOrPasswordError && error && (
          <p className={styles.error}>{error}</p>
        )}
      </>
    );
  }
);

export default AuthInput;
