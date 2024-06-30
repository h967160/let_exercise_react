import styles from "./Tabs.module.scss";
import { useUser } from "@/contexts/UserContext";
import ActivityCard from "@/components/Card/ActivityCard/ActivityCard";
import { useEffect } from "react";

const TabContext = ({ activeTab }) => {
  const { user, userActivities, fetchUserActivities } = useUser();
  // 在切換到「我的開團」標籤時，觸發 fetchUserActivities
  useEffect(() => {
    // 確保 user 存在並且 activeTab 需要 user 相關數據時才觸發 fetchUserActivities
    if (user && activeTab === "created-activities") {
      fetchUserActivities(user.id);
    }
  }, [user, activeTab, fetchUserActivities]);

  const renderContent = () => {
    switch (activeTab) {
      case "followers":
        return (
          <section className={styles.tabContent}>
            <h1>我的粉絲</h1>
          </section>
        );
      case "following":
        return (
          <section className={styles.tabContent}>
            <h1>我的追蹤</h1>
          </section>
        );
      case "created-activities":
        return (
          <section className={styles.tabContent}>
            <div className={styles.cardContainer}>
              {userActivities.map((activities) => (
                <ActivityCard
                  key={activities.id}
                  activityId={activities.id}
                  hostId={activities.hostId}
                  userId={user.id}
                  arenaName={activities.arenaName}
                  date={activities.date}
                  timeStart={activities.timeStart}
                  timeEnd={activities.timeEnd}
                  levelId={activities.levelId}
                />
              ))}
            </div>
          </section>
        );
      case "joined-activities":
        return (
          <section className={styles.tabContent}>
            <h1>我的報名</h1>
          </section>
        );
      default:
        return null;
    }
  };
  return <>{renderContent()}</>;
};

export default TabContext;
