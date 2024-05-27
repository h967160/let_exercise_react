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
    const getResponseErrorMessage = () => {
      if (responseError) {
        if (
          responseError.includes("帳號已存在") ||
          (responseError.includes("Account already exists!") &&
            id === "account")
        ) {
          return "帳號已存在!";
        }
        if (
          responseError.includes("帳號或密碼錯誤") &&
          (id === "account" || id === "password")
        ) {
          return "帳號或密碼錯誤!";
        }
        if (
          responseError.includes("National ID already exists!") &&
          id === "nationalId"
        ) {
          return "身分證已被使用!";
        }
        if (responseError.includes("Email already exists!") && id === "email") {
          return "Email已被使用!";
        }
        if (
          responseError.includes("Phone number already exists!") &&
          id === "phoneNumber"
        ) {
          return "手機號碼已被使用!";
        }
        if (
          responseError.includes("性別與身分證不相符") &&
          (id === "gender" || id === "nationalId")
        ) {
          return "性別與身分證不相符!";
        }
        if (
          responseError.includes("生日&球齡日期不得晚於今天") &&
          (id === "birthdate" || id === "playSince")
        ) {
          return "生日&球齡日期不得晚於今天!";
        }
        if (
          responseError.includes("球齡不得早於出生年月日") &&
          id === "playSince"
        ) {
          return "球齡不得早於出生年月日!";
        }
      }
      // 如果沒有符合的responseError，則回傳error
      return error;
    };
    return (
      <>
        <label className={styles.label}>
          {label}
          {required && <span>*</span>}
        </label>
        <input
          className={`${styles.input} ${
            getResponseErrorMessage() ? styles.inputError : ""
          }`}
          type={type || "text"}
          id={id}
          placeholder={placeholder || ""}
          ref={ref}
          required={required}
          onChange={onChange}
          {...props}
        />
        {getResponseErrorMessage() && (
          <p className={styles.error}>{getResponseErrorMessage()}</p>
        )}
      </>
    );
  }
);

export default AuthInput;
