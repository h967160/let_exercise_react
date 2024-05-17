import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "@/components/Common/Auth/Auth";
import Swal from "sweetalert2";
import styles from "./SignUpPage.module.scss";
import Main from "@/components/Main/Main";
import AuthInput from "@/components/Auth/AuthInput";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer/Footer";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [responseError, setResponseError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nationalId: "",
      email: "",
      account: "",
      password: "",
      checkPassword: "",
      firstName: "",
      lastName: "",
      nickName: "",
      gender: "",
      introduction: "",
      avatar: "",
      birthdate: "",
      playSince: "",
      phoneNumber: "",
    },
  });
  const nationalId = watch("nationalId");

  // 監聽身份證字號自動帶入性別
  useEffect(() => {
    if (nationalId) {
      if (nationalId.charAt(1) === "1") {
        setValue("gender", "male");
      } else if (nationalId.charAt(1) === "2") {
        setValue("gender", "female");
      } else {
        setValue("gender", "");
      }
    }
  }, [nationalId, setValue]);

  // 驗證生日
  const validateBirthdate = (value) => {
    // 驗證日期是否是未來日期
    const selectedDate = new Date(value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return "出生日期不得晚於今天";
    }

    // 驗證年齡是否滿九歲
    const minDate = new Date(
      currentDate.getFullYear() - 9,
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
    if (selectedDate > minDate) {
      return "註冊年齡須年滿9歲";
    }

    return true;
  };

  // 驗證球齡
  const validatePlaySince = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      return "球齡不得晚於今天";
    }

    return true;
  };

  // 測試用一鍵輸入按鈕 之後會刪除
  const handleQuickFill = () => {
    // 使用者點擊一鍵輸入按鈕後，將預設的註冊資訊填入對應的表單欄位中
    setValue("lastName", "Doe");
    setValue("firstName", "John");
    setValue("nickName", "JD");
    setValue("account", "test11");
    setValue("password", "Test1111");
    setValue("checkPassword", "Test1111");
    setValue("nationalId", "P123456789");
    setValue("email", "test11@test.com");
    setValue("birthdate", "1990-01-01");
    setValue("phoneNumber", "0912345678");
    setValue("playSince", "2020-03-01");
    setValue("introduction", "Hello, I'm John Doe!");
  };

  const onSubmit = async ({
    nationalId,
    email,
    account,
    password,
    checkPassword,
    firstName,
    lastName,
    nickName,
    gender,
    introduction,
    avatar,
    birthdate,
    playSince,
    phoneNumber,
  }) => {
    const response = await signup({
      nationalId,
      email,
      account,
      password,
      checkPassword,
      firstName,
      lastName,
      nickName,
      gender,
      introduction,
      avatar: null,
      birthdate,
      playSince,
      phoneNumber,
    });
    if (response.success) {
      Swal.fire({
        position: "top",
        title: "註冊成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      setResponseError("");
      navigate("/login");
      return;
    } else {
      Swal.fire({
        position: "top",
        title: "註冊失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      setResponseError(response.message);
    }
  };

  return (
    <>
      <Header />
      <Main>
        <div className="container">
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={styles.formWrapper}>
              {/* 一鍵按鈕區塊之後刪除 */}
              <div>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  onClick={handleQuickFill}
                >
                  一鍵輸入
                </button>
              </div>
              {/* 一鍵按鈕區塊之後刪除 */}
              <div className={`${styles.formGroup} ${styles.flexRow}`}>
                <div className={styles.flexColumn}>
                  <AuthInput
                    label={"姓"}
                    id={"lastName"}
                    responseError={responseError}
                    placeholder={"請輸入您的姓氏"}
                    required={true}
                    {...register("lastName", {
                      required: "姓氏為必填",
                      maxLength: {
                        value: 20,
                        message: "姓氏最多不超過為20個字元",
                      },
                    })}
                    error={errors.lastName ? errors.lastName.message : null}
                  />
                </div>
                <div className={styles.flexColumn}>
                  <AuthInput
                    label={"名"}
                    id={"firstName"}
                    responseError={responseError}
                    placeholder={"請輸入您的名字"}
                    required={true}
                    {...register("firstName", {
                      required: "名字為必填",
                      maxLength: {
                        value: 20,
                        message: "名字最多不超過為20個字元",
                      },
                    })}
                    error={errors.firstName ? errors.firstName.message : null}
                  />
                </div>
                <div className={styles.flexColumn}>
                  <AuthInput
                    label={"暱稱"}
                    id={"nickName"}
                    responseError={responseError}
                    placeholder={"請輸入您的暱稱"}
                    {...register("nickName", {
                      maxLength: {
                        value: 20,
                        message: "暱稱最多不超過為20個字元",
                      },
                    })}
                    error={errors.nickName ? errors.nickName.message : null}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  label={"帳號"}
                  id={"account"}
                  responseError={responseError}
                  placeholder={"請輸入至少5個字元且含英數字的帳號"}
                  required={true}
                  {...register("account", {
                    required: "帳號為必填",
                    minLength: {
                      value: 5,
                      message: "帳號需至少為5個字元",
                    },
                    maxLength: {
                      value: 50,
                      message: "帳號最多不超過50個字元",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "帳號格式錯誤",
                    },
                  })}
                  error={errors.account ? errors.account.message : null}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="password"
                  label={"密碼"}
                  id={"password"}
                  responseError={responseError}
                  placeholder={
                    "請輸入最少8個字元，需包含至少一個大寫英文字母和一個數字"
                  }
                  required={true}
                  {...register("password", {
                    required: "密碼為必填",
                    maxLength: {
                      value: 20,
                      message: "密碼最多不超過20個字元",
                    },
                    minLength: {
                      value: 8,
                      message: "密碼需至少為8個字元",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).{8,20}$/,
                      message: "密碼格式錯誤",
                    },
                  })}
                  error={errors.password ? errors.password.message : null}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="password"
                  label={"確認密碼"}
                  id={"checkPassword"}
                  responseError={responseError}
                  placeholder={"請再輸入一次密碼"}
                  required={true}
                  {...register("checkPassword", {
                    required: "確認密碼為必填",
                    validate: (value) =>
                      value === getValues("password") || "確認密碼與密碼不一致",
                  })}
                  error={
                    errors.checkPassword ? errors.checkPassword.message : null
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  label={"身分證字號"}
                  id={"nationalId"}
                  responseError={responseError}
                  placeholder={"請輸入正確的身分證字號（第一碼為大寫英文字母）"}
                  required={true}
                  {...register("nationalId", {
                    required: "身分證字號為必填",
                    maxLength: {
                      value: 10,
                      message: "身分證字號最多不超過10個字元",
                    },
                    pattern: {
                      value: /^[A-Za-z][12]\d{8}$/,
                      message: "身分證字號格式錯誤",
                    },
                  })}
                  error={errors.nationalId ? errors.nationalId.message : null}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="email"
                  label={"Email"}
                  id={"email"}
                  responseError={responseError}
                  placeholder={"請輸入有效的Email"}
                  required={true}
                  {...register("email", {
                    required: "Email為必填",
                    maxLength: {
                      value: 200,
                      message: "Email最多不超過10個字元",
                    },
                    pattern: {
                      value:
                        /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,100})$/i,
                      message: "Email格式錯誤",
                    },
                  })}
                  error={errors.email ? errors.email.message : null}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">
                  性別<span>*</span>
                </label>
                <div className={styles.flexRowGender}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    required
                    {...register("gender", {
                      required: "性別為必填",
                    })}
                  />
                  <label htmlFor="male">男性</label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    {...register("gender", {
                      required: "性別為必填",
                    })}
                  />
                  <label htmlFor="female">女性</label>
                </div>
                {responseError &&
                  responseError.includes("性別與身分證不相符") && (
                    <span className={styles.error}>性別與身分證不相符</span>
                  )}
                {errors.gender && (
                  <span className={styles.error}>{errors.gender.message}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="date"
                  label={"出生日期"}
                  id={"birthdate"}
                  responseError={responseError}
                  required={true}
                  {...register("birthdate", {
                    required: "出生日期為必填",
                    validate: validateBirthdate,
                  })}
                  error={errors.birthdate ? errors.birthdate.message : null}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  label={"手機"}
                  id={"phoneNumber"}
                  responseError={responseError}
                  required={true}
                  placeholder={"請輸入正確的手機號碼（例如：0912345678）"}
                  {...register("phoneNumber", {
                    required: "手機為必填",
                    maxLength: {
                      value: 10,
                      message: "手機最多不超過10個字元",
                    },

                    pattern: {
                      value: /^09\d{8}$/i,
                      message: "手機格式錯誤",
                    },
                  })}
                  error={errors.phoneNumber ? errors.phoneNumber.message : null}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="date"
                  label={"接觸羽球時間"}
                  id={"playSince"}
                  responseError={responseError}
                  {...register("playSince", {
                    validate: validatePlaySince,
                  })}
                  error={errors.playSince ? errors.playSince.message : null}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="introduction">個人簡介</label>
                <textarea
                  rows="10"
                  name="introduction"
                  className={`${errors.introduction ? styles.inputError : ""}`}
                  id="introduction"
                  placeholder="請輸入您的個人簡介（最多150字元）"
                  {...register("introduction", {
                    maxLength: {
                      value: 150,
                      message: "個人簡介最多不超過150個字元",
                    },
                  })}
                ></textarea>
                {errors.introduction && (
                  <span className={styles.error}>
                    {errors.introduction.message}
                  </span>
                )}
              </div>
              <div className={`${styles.formGroup} ${styles.formButton}`}>
                <AuthButton text={"註冊"} type="submit" />
              </div>
              <div className={styles.singleSignOn}>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png"
                  className="single-sign-on-img cursor-pointer"
                  alt="Facebook"
                />
                <img
                  src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-256.png"
                  alt="Google"
                  className="single-sign-on-img cursor-pointer"
                />
                <img
                  src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/200_Line_logo_logos-256.png"
                  alt="Line"
                  className="single-sign-on-img cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default SignUpPage;
