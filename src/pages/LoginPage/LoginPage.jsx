import Swal from "sweetalert2";
import styles from "./LoginPage.module.scss";
import Footer from "@/components/Layouts/Footer/Footer";
import Main from "@/components/Main/Main";
import Header from "@/components/Layouts/Header/Header";
import AuthInput from "@/components/Auth/AuthInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton, AuthLinkText } from "@/components/Common/Auth";
import { login } from "@/apis/auth";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault(); // 阻止表單的預設行為

    // 檢查帳號和密碼是否為空
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    try {
      const response = await login({
        account,
        password,
      });

      // 如果 response 存在且狀態是成功
      if (response && response.status === "Success") {
        // 從回應中取得 token
        const { token } = response.data;
        // 將 token 存入 localStorage
        localStorage.setItem("token", token);
        navigate("/");
        // 登入成功訊息
        Swal.fire({
          position: "top",
          title: "登入成功！",
          timer: 1500,
          icon: "success",
          showConfirmButton: false,
        });
        return;
      }
      // 登入失敗訊息
      Swal.fire({
        position: "top",
        title: "登入失敗！",
        timer: 1500,
        icon: "error",
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("登入失敗:", error);
    }
  };

  return (
    <>
      <Header />
      <Main>
        <div className="container">
          <form className={styles.form}>
            <div className={styles.formWrapper}>
              <div className={styles.formGroup}>
                <AuthInput
                  label={"帳號"}
                  value={account}
                  placeholder={"請輸入帳號或Email"}
                  onChange={(account) => setAccount(account)}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="password"
                  label={"密碼"}
                  value={password}
                  placeholder={"請輸入密碼"}
                  onChange={(password) => setPassword(password)}
                />
              </div>
              <div className={`${styles.formGroup} ${styles.flexRowCheck}`}>
                <AuthInput type={"checkbox"} label={"記住我"} />
              </div>
              <div className={`${styles.formGroup} ${styles.formButton}`}>
                <AuthButton text={"登入"} onClick={handleClick} />
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
