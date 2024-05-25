import styles from "./UserInfo.module.scss";
import star from "@/assets/images/star.png";

const UserInfo = () => {
  return (
    <section className={styles.hostUserInfo}>
      <div className={styles.hostUserInfoWrapper}>
        <div className={styles.userImage}>
          <img
            src="https://xsgames.co/randomusers/assets/avatars/male/7.jpg"
            alt="user-avatar"
          />
        </div>
        <div className={styles.userInfoRating}>
          <h3 className="hostName">Andy Wang</h3>
          <div className={styles.ratingWrapper}>
            <img src={star} alt="star.png" />
            <span className={styles.rating}>4.5</span>
          </div>
        </div>
        <div className={styles.userInfoText}>
          <p className="times">開團次數：100次</p>
          <p className="playSince">球齡：5年10月</p>
          <p className="introduction">簡介：</p>
          <p className={styles.introductionText}>
            嗨，我是Andy！羽球愛好者，對這項運動充滿熱情。歡迎你加入我們的活動，一同享受輕鬆、愉快的打球時光。在這裡，我們不僅追求技巧的提升，更注重團隊合作和友誼的建立。期待著和你一起揪團，一同挑戰羽球場上的黃金時光！
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
