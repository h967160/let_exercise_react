import styles from "./Activity.module.scss";
import ActivityList from "./ActivityList";

const Activity = () => {
  return (
    <div className="container">
      <section className={styles.activity}>
        <div className={styles.activityWrapper}>
          <ActivityList />
        </div>
      </section>
    </div>
  );
};

export default Activity;
