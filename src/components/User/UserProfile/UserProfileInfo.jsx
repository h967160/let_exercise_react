import { useUser } from "@/contexts/UserContext";
import styles from "./UserProfileInfo.module.scss";
import { Button } from "@/components/Common/Button/Button";
import { useNavigate } from "react-router-dom";

const UserProfileInfo = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  if (!user) {
    return null;
  }

  const handleEditButtonClick = () => {
    navigate("/settings");
  };

  const handleCreateButtonClick = () => {
    navigate("/activities/create");
  };

  return (
    <section className={styles.userProfileInfo}>
      <div className={styles.userInfoWrapper}>
        <div className={styles.userImage}>
          <figure className={styles.avatarBox}>
            <img src={user.avatar} alt="user-avatar" />
          </figure>
        </div>
        <div className={styles.userInfoStats}>
          <div className={styles.userName}>
            <h3 className="nickname">{user.nickname}</h3>
            <p className="account">@{user.account}</p>
          </div>
          <div className={styles.stats}>
            <div>
              <span id="followerCount">{user.followerCount}</span>
              <div>粉絲數</div>
            </div>
            <div>
              <span id="followingCount">{user.followingCount}</span>
              <div>追蹤中</div>
            </div>
            <div>
              <span id="participationCount">{user.participationCount}</span>
              <div>報名中</div>
            </div>
            <div>
              <span id="activityHostCount">{user.activityHostCount}</span>
              <div>開團中</div>
            </div>
          </div>
        </div>
        <div className={styles.buttonBox}>
          <Button
            text={"我要開團"}
            className={styles.createButton}
            onClick={handleCreateButtonClick}
          ></Button>
          <Button
            text={"個人資料"}
            className={styles.editButton}
            onClick={handleEditButtonClick}
          ></Button>
        </div>
      </div>
    </section>
  );
};

export default UserProfileInfo;
