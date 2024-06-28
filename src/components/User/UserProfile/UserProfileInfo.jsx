import styles from "./UserProfileInfo.module.scss";
import { Button } from "@/components/Common/Button/Button";

const UserProfileInfo = () => {
  return (
    <section className={styles.userProfileInfo}>
      <div className={styles.userInfoWrapper}>
        <div className={styles.userImage}>
          <figure className={styles.avatarBox}>
            <img
              src="https://xsgames.co/randomusers/assets/avatars/male/7.jpg"
              alt="user avatar"
            />
          </figure>
        </div>
        <div className={styles.userInfoStats}>
          <div className={styles.userName}>
            <h3 className="name">Andy Wang</h3>
            <p className="account">@test11</p>
          </div>
          <div className={styles.stats}>
            <div>
              <span id="followers-count">2</span>
              <div>粉絲數</div>
            </div>
            <div>
              <span id="following-count">5</span>
              <div>追蹤中</div>
            </div>
            <div>
              <span id="joined-activities-count">1</span>
              <div>報名中</div>
            </div>
            <div>
              <span id="created-activities-count">3</span>
              <div>開團中</div>
            </div>
          </div>
        </div>
        <Button text={"編輯個人資料"}></Button>
      </div>
    </section>
  );
};

export default UserProfileInfo;
