import styles from "./Activity.module.scss";
import { formatDate, formatTime } from "@/utils/dateFormat";

const ActivityItem = ({
  arenaName,
  date,
  timeStart,
  timeEnd,
  level,
  shuttlecockProvide,
  description,
}) => {
  return (
    <li className={`${styles.activityItem} cursor-point`}>
      <div className="arenaName">{arenaName}</div>
      <div className="date">{formatDate(date)}</div>
      <div className="time">
        {formatTime(timeStart)}-{formatTime(timeEnd)}
      </div>
      <div className="level">{level}</div>
      <div className="shuttlecockProvide">
        {shuttlecockProvide ? "是" : "否"}
      </div>
      <div className="description">{description}</div>
    </li>
  );
};

export default ActivityItem;
