import styles from "./Header.module.scss";
import NavbarMenu from "./Navbar/NavbarMenu";
import "@/styles/reset.scss";
import "@/styles/base.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavbarMenu />
      </div>
    </header>
  );
};

export default Header;
