import styles from "./Activity.module.scss";
import { formatDate, formatTime } from "@/utils/format";
import { useActivity } from "@/contexts/ActivityContext";

const ActivityInfo = () => {
  const { activity } = useActivity();
  if (!activity) {
    return null;
  }
  return (
    <>
      <section className={styles.activityInfo}>
        <div className={styles.activityInfoWrapper}>
          <div className={styles.activityInfoImage}>
            <img src="https://picsum.photos/200" alt="activity" />
          </div>
          <div className={styles.activityInfoText}>
            <h2 className={styles.title}>
              <span>活動資訊</span>
            </h2>
            <p className="arenaName">場館：{activity.arenaName}</p>
            <p className="date">日期：{formatDate(activity.date)}</p>
            <p className="time">
              時間：{formatTime(activity.timeStart)}-
              {formatTime(activity.timeEnd)}
            </p>
            <p className="level">程度：{activity.level}</p>
            <p className="shuttlecockProvide">
              供球：
              {activity.shuttlecockProvide
                ? `是，${activity.shuttlecockName}`
                : "否"}
            </p>
            <p className="fee">費用：{activity.fee}$</p>
            <p className="numsOfPeople">需求人數：{activity.numsOfPeople}人</p>
            <p className="totalPeople">總共人數：{activity.totalPeople}人</p>
            <p className="currentJoinNums">
              目前已報名：{activity.currentJoinNums}人
            </p>
            <p className="description">
              描述：
              <span>{activity.description}</span>
            </p>
            <div className={styles.buttonControl}>
              <button className={styles.signupButton}>我要報名</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityInfo;
