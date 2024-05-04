import cart from "@/assets/images/cart.png";
import user from "@/assets/images/user.png";
import moon from "@/assets/images/moon.png";
import styles from "./Navbar.module.scss";

const NavbarIcon = () => {
  return (
    <div className={styles.navIcon}>
      {/* cart */}
      <img className="cart-icon cursor-point" src={cart} alt="cart.png" />
      {/* user */}
      <img className="user-icon cursor-point" src={user} alt="user.png" />
      {/* moon */}
      <img
        className={`${styles.moonIcon} cursor-point`}
        src={moon}
        alt="moon.png"
      />
    </div>
  );
};

export default NavbarIcon;
