import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const NavbarItem = ({ label, path, onClick }) => {
  return (
    <li className={styles.navItem}>
      <Link to={path} className={styles.navLink} onClick={onClick}>
        {label}
      </Link>
    </li>
  );
};

export default NavbarItem;
