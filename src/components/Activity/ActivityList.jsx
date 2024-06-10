import React from "react";
import styles from "./Activity.module.scss";
import ActivityItem from "./ActivityItem";
import { useActivity } from "@/contexts/ActivityContext";
import { useNavigate } from "react-router-dom";

const ActivityList = () => {
  const { activities, getLevelName } = useActivity();
  const navigate = useNavigate();

  const handleItemClick = (activityId) => {
    navigate(`/activities/${activityId}`);
  };
  return (
    <ul className={styles.activityList}>
      <li className={styles.activityHeader}>
        <div className="area">地點</div>
        <div className="date">日期</div>
        <div className="time">時間</div>
        <div className="levelId">程度</div>
        <div className="shuttlecockProvide">供球</div>
        <div className="description">描述</div>
      </li>
      {activities.length > 0 &&
        activities.map((activity, index) => (
          <div key={index} onClick={() => handleItemClick(activity.id)}>
            <ActivityItem
              key={index}
              arenaName={activity.arenaName}
              date={activity.date}
              timeStart={activity.timeStart}
              timeEnd={activity.timeEnd}
              level={getLevelName(activity.levelId)}
              shuttlecockProvide={activity.shuttlecockProvide}
              description={activity.description}
            />
          </div>
        ))}
    </ul>
  );
};

export default ActivityList;
