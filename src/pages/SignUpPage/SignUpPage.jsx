import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "@/components/Common/Auth";
import Swal from "sweetalert2";
import styles from "./SignUpPage.module.scss";
import Main from "@/components/Main/Main";
import AuthInput from "@/components/Auth/AuthInput";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer/Footer";

const SignUpPage = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nickName, setNickName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [playSince, setPlaySince] = useState("2023-01-01");
  const [introduction, setIntroduction] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  // 測試用一鍵輸入按鈕 之後會刪除
  const handleQuickFill = () => {
    // 使用者點擊一鍵輸入按鈕後，將預設的註冊資訊填入對應的狀態中
    setLastName("Doe");
    setFirstName("John");
    setNickName("JD");
    setAccount("test11");
    setPassword("Test1111");
    setCheckPassword("Test1111");
    setNationalId("P123456789");
    setEmail("test11@test.com");
    setGender("male");
    setBirthdate("1990-01-01");
    setPhoneNumber("0912345678");
    setPlaySince("2020-03-01");
    setIntroduction("Hello, I'm John Doe!");
  };

  const handleClick = async (event) => {
    event.preventDefault(); // 阻止表單的預設行為

    // 檢查帳號和密碼是否為空
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const success = await signup({
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
    });
    if (success) {
      Swal.fire({
        position: "top",
        title: "註冊成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/login");
      return;
    }
    Swal.fire({
      position: "top",
      title: "註冊失敗！",
      timer: 1000,
      icon: "error",
      showConfirmButton: false,
    });
  };

  return (
    <>
      <Header />
      <Main>
        <div className="container">
          <form className={styles.form}>
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
                    value={lastName}
                    placeholder={"請輸入您的姓氏"}
                    required={true}
                    onChange={(lastName) => setLastName(lastName)}
                  />
                </div>
                <div className={styles.flexColumn}>
                  <AuthInput
                    label={"名"}
                    value={firstName}
                    placeholder={"請輸入您的名字"}
                    required={true}
                    onChange={(firstName) => setFirstName(firstName)}
                  />
                </div>
                <div className={styles.flexColumn}>
                  <AuthInput
                    label={"暱稱"}
                    value={nickName}
                    placeholder={"請輸入您的暱稱"}
                    onChange={(nickName) => setNickName(nickName)}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  label={"帳號"}
                  value={account}
                  placeholder={"請輸入至少6個字元的帳號"}
                  required={true}
                  onChange={(account) => setAccount(account)}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="password"
                  label={"密碼"}
                  value={password}
                  placeholder={
                    "請輸入最少8個字元，需包含至少一個大寫英文字母和一個數字"
                  }
                  required={true}
                  onChange={(password) => setPassword(password)}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="password"
                  label={"確認密碼"}
                  value={checkPassword}
                  placeholder={"請再輸入一次密碼"}
                  required={true}
                  onChange={(checkPassword) => setCheckPassword(checkPassword)}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  label={"身分證字號"}
                  value={nationalId}
                  placeholder={"請輸入正確的身分證字號（第一碼為大寫英文字母）"}
                  required={true}
                  onChange={(nationalId) => setNationalId(nationalId)}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="email"
                  label={"Email"}
                  value={email}
                  placeholder={"請輸入有效的Email"}
                  required={true}
                  onChange={(email) => setEmail(email)}
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
                    checked={gender === "male"}
                    onChange={handleGenderChange}
                  />
                  <span>男性</span>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleGenderChange}
                  />
                  <span>女性</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="date"
                  label={"出生日期"}
                  value={birthdate}
                  required={true}
                  onChange={(birthdate) => setBirthdate(birthdate)}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  label={"手機"}
                  value={phoneNumber}
                  required={true}
                  placeholder={"請輸入正確的手機號碼（例如：0912345678）"}
                  onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
              </div>
              <div className={styles.formGroup}>
                <AuthInput
                  type="date"
                  label={"接觸羽球時間"}
                  value={playSince}
                  onChange={(playSince) => setPlaySince(playSince)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="introduction">個人簡介</label>
                <textarea
                  rows="10"
                  name="introduction"
                  id="introduction"
                  maxLength="150"
                  placeholder="請輸入您的個人簡介（最多150字元）"
                  value={introduction}
                  onChange={handleIntroductionChange}
                ></textarea>
              </div>
              <div className={`${styles.formGroup} ${styles.formButton}`}>
                <AuthButton text={"註冊"} onClick={handleClick} />
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
