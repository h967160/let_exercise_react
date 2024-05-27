import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInfo.module.scss";
import star from "@/assets/images/star.png";
import { useActivity } from "@/contexts/ActivityContext";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { calculatePlaySince } from "@/utils/format";
import { Button } from "../Common/Button/Button";

const UserInfo = () => {
  const { activity } = useActivity();
  const { isAuthenticated } = useAuth();
  const { user, fetchUserData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, fetchUserData]);

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  // 需優化
  if (!activity) {
    return null;
  }

  return (
    <section className={styles.hostUserInfo}>
      <div className={styles.hostUserInfoWrapper}>
        <div className={styles.userImage}>
          <img src={activity.avatar} alt="user-avatar" />
        </div>
        <div className={styles.userInfoRating}>
          <h3 className="hostName">{activity.hostName}</h3>
          {isAuthenticated && user ? (
            <>
              <div className={styles.ratingWrapper}>
                <img src={star} alt="star.png" />
                <span className={styles.rating}>{user.rating}</span>
              </div>
              <div className={styles.userInfoText}>
                <p className="times">開團次數：{user.activityHostCount}次</p>
                <p className="playSince">
                  球齡：{calculatePlaySince(user.playSince)}
                </p>
                <p className="introduction">簡介：</p>
                <p className={styles.introductionText}>{user.introduction}</p>
              </div>
            </>
          ) : (
            <Button text={"詳細"} onClick={handleLoginButtonClick}></Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
