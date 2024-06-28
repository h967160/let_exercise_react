import styles from "./Tabs.module.scss";

const Tabs = () => {
  return (
    <section className={styles.tabs}>
      <div className={styles.tabWrapper}>
        <div className={styles.tab} id="followers">
          我的粉絲
        </div>
        <div className={styles.tab} id="following">
          我的追蹤
        </div>
        <div
          className={`${styles.tab} ${styles.active}`}
          id="joined-activities"
        >
          我的報名
        </div>
        <div className={styles.tab} id="created-activities">
          我的開團
        </div>
      </div>
    </section>
  );
};

export default Tabs;
