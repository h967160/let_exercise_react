import styles from "./Navbar.module.scss";
import NavbarItem from "./NavbarItem";
import NavbarIcon from "./NavbarIcon";
import logo from "@/assets/images/logo.jpg";
import hamburger from "@/assets/images/hamburger.png";
import { Link } from "react-router-dom";

const navItems = [
  { label: "球團報名", path: "/activities" },
  { label: "場地資訊", path: "" },
  { label: "討論區", path: "" },
  { label: "商城", path: "" },
];

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
        <Link to="/" className={styles.navbarBrandLink}>
          運動揪團網
        </Link>
      </div>
      {/* navbar-toggle */}
      <input
        id="navbarToggle"
        className={styles.navbarToggle}
        type="checkbox"
      />
      <label htmlFor="navbarToggle" className={styles.burgerContainer}>
        <img
          src={hamburger}
          className={styles.iconToggle}
          alt="hamburger.png"
        />
      </label>
      {/* navbar links */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item, index) => (
            <NavbarItem key={index} label={item.label} path={item.path} />
          ))}
        </ul>
      </nav>
      {/* navbar icons */}
      <NavbarIcon />
    </div>
  );
};

export default NavbarMenu;
