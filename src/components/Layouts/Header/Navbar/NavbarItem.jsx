import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const NavbarItem = ({ label, path }) => {
  return (
    <li className={styles.navItem}>
      <Link to={path} className={styles.navLink}>
        {label}
      </Link>
    </li>
  );
};

export default NavbarItem;
