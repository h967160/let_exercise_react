import React from "react";
import styles from "./Activity.module.scss";
import ActivityItem from "./ActivityItem";
import { useActivity } from "@/contexts/ActivityContext";

const ActivityList = () => {
  const { activities } = useActivity();
  return (
    <ul className={styles.activityList}>
      <li className={styles.activityHeader}>
        <div className="area">地點</div>
        <div className="date">日期</div>
        <div className="time">時間</div>
        <div className="level">程度</div>
        <div className="shuttlecockProvide">供球</div>
        <div className="description">描述</div>
      </li>
      {activities.length > 0 &&
        activities.map((activity, index) => (
          <ActivityItem
            key={index}
            arenaName={activity.arenaName}
            date={activity.date}
            timeStart={activity.timeStart}
            timeEnd={activity.timeEnd}
            level={activity.level}
            shuttlecockProvide={activity.shuttlecockProvide}
            description={activity.description}
          />
        ))}
    </ul>
  );
};

export default ActivityList;
