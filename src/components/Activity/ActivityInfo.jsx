import styles from "./Activity.module.scss";

const ActivityInfo = () => {
  return (
    <>
      <div className={`container ${styles.container}`}>
        <section className={styles.activityInfo}>
          <div className={styles.activityInfoWrapper}>
            <div className={styles.activityInfoImage}>
              <img src="https://picsum.photos/200" alt="activity" />
            </div>
            <div className={styles.activityInfoText}>
              <h2 className={styles.title}>
                <span>活動資訊</span>
              </h2>
              <p className="arenaName">場館：臺北體育館</p>
              <p className="date">日期：2024/05/21 星期一</p>
              <p className="time">時間：1200-1400</p>
              <p className="level">程度：新手</p>
              <p className="shuttlecockProvide">供球：是，SELECT B-09精選級</p>
              <p className="fee">費用：170$</p>
              <p className="numOfPeople">需求人數：5人</p>
              <p className="totalPeople">總共人數：14人</p>
              <p className="description">
                描述：
                <span>
                  新手友善～歡迎大家一起來打球唷！不要害羞快來一起玩吧！
                </span>
              </p>
              <div className={styles.buttonControl}>
                <button className={styles.signupButton}>我要報名</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ActivityInfo;
