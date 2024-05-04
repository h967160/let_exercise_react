import styles from "./Navbar.module.scss";

const NavbarItem = ({ label }) => {
  return (
    <li className={styles.navItem}>
      {/* eslint-disable-next-line*/}
      <a href="#" className={styles.navLink}>
        {label}
      </a>
    </li>
  );
};

export default NavbarItem;
