import Swal from "sweetalert2";
import styles from "./LoginPage.module.scss";
import Footer from "@/components/Layouts/Footer/Footer";
import Main from "@/components/Main/Main";
import Header from "@/components/Layouts/Header/Header";
import AuthInput from "@/components/Auth/AuthInput";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton, AuthLinkText } from "@/components/Common/Auth/Auth";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); // 取出需要的狀態與方法
  const [responseError, setResponseError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      account: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await login(data);
    if (response.success) {
      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1500,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/");
    } else {
      Swal.fire({
        position: "top",
        title: "登入失敗！",
        timer: 1500,
        icon: "error",
        showConfirmButton: false,
      });
      setResponseError(response.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      <Header />
      <Main>
        <div className="container">
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formWrapper}>
              <div className={styles.formGroup}>
                <AuthInput
                  label={"帳號"}
                  id={"account"}
                  placeholder={"請輸入帳號或Email"}
                  {...register("account", {
                    required: "帳號或Email為必填",
                  })}
                  responseError={responseError}
                  error={errors.account ? errors.account.message : null}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="password"
                  label={"密碼"}
                  id={"password"}
                  placeholder={"請輸入密碼"}
                  {...register("password", {
                    required: "密碼為必填",
                  })}
                  responseError={responseError}
                  error={errors.password ? errors.password.message : null}
                />
              </div>
              <div className={`${styles.formGroup} ${styles.flexRowCheck}`}>
                <AuthInput
                  type={"checkbox"}
                  label={"記住我"}
                  {...register("remember")}
                />
              </div>
              <div className={`${styles.formGroup} ${styles.formButton}`}>
                <AuthButton text={"登入"} type="submit" />
              </div>
              <div className={`${styles.formGroup} ${styles.formButton}`}>
                <Link to="/signup">
                  <AuthLinkText text={"註冊"}></AuthLinkText>
                </Link>
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

export default LoginPage;
