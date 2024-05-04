import styles from "./Background.module.scss";
import Search from "./Search";

const Background = () => {
  return (
    <div className={styles.background}>
      <div className={styles.backgroundTitle}>
        <h1>BADMINTON</h1>
      </div>
      <Search />
    </div>
  );
};

export default Background;
