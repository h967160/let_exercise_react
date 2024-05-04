import styles from "./Navbar.module.scss";
import NavbarItem from "./NavbarItem";
import NavbarIcon from "./NavbarIcon";
import logo from "@/assets/images/logo.jpg";
import hamburger from "@/assets/images/hamburger.png";

const navItems = ["球團報名", "場地資訊", "討論區", "商城"];

const NavbarMenu = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.navbarBrand}>
        <img
          className={`${styles.navbarBrandLogo} cursor-point`}
          src={logo}
          alt="logo.jpg"
        />
        {/* eslint-disable-next-line*/}
        <a href="#" className={styles.navbarBrandLink}>
          運動揪團網
        </a>
      </div>
      {/* navbar-toggle */}
      <input
        id="navbarToggle"
        className={styles.navbarToggle}
        type="checkbox"
      />
      <label for="navbarToggle" className={styles.burgerContainer}>
        <img
          src={hamburger}
          className={styles.iconToggle}
          alt="hamburger.png"
        />
      </label>
      {/* navbar links */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((label, index) => (
            <NavbarItem key={index} label={label} />
          ))}
        </ul>
      </nav>
      {/* navbar icons */}
      <NavbarIcon />
    </div>
  );
};

export default NavbarMenu;
