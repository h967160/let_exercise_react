import cart from "@/assets/images/cart.png";
import user from "@/assets/images/user.png";
import moon from "@/assets/images/moon.png";
import styles from "./Navbar.module.scss";
import NavbarItem from "./NavbarItem";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "登入", path: "/login" },
  { label: "註冊", path: "/signup" },
  { label: "新增活動", path: "/activities/create" },
  { label: "資料設定", path: "/settings" }, //還沒做
  { label: "帳號登出", path: "/logout" },
];

const NavbarIcon = () => {
  const { logout, isAuthenticated } = useAuth();

  // 根據是否登入顯示
  const generateNavItems = () => {
    if (isAuthenticated) {
      return ["資料設定", "新增活動", "帳號登出"];
    } else {
      return ["登入", "註冊"];
    }
  };
  return (
    <div className={styles.navIcon}>
      {/* cart */}
      <img className="cart-icon cursor-point" src={cart} alt="cart.png" />
      {/* moon */}
      <img
        className={`${styles.moonIcon} cursor-point`}
        src={moon}
        alt="moon.png"
      />
      {/* user */}
      <div className={styles.userDropdown}>
        <input
          type="checkbox"
          id="userDropdownCheckbox"
          className={`${styles.userDropdownToggle} ${styles.userDropdownCheckbox}`}
        />
        <label htmlFor="userDropdownCheckbox">
          <img className="user-icon cursor-point" src={user} alt="user.png" />
        </label>
        <div className={styles.dropdownMenu}>
          <ul className={styles.navList}>
            {generateNavItems().map((label, index) => (
              <NavbarItem
                key={index}
                label={label}
                path={navItems.find((item) => item.label === label).path}
                onClick={label === "帳號登出" ? logout : null}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarIcon;
