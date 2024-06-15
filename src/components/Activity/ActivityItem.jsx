import styles from "./Activity.module.scss";
import { formatDate, formatTime } from "@/utils/format";

const ActivityItem = ({
  arenaName,
  date,
  timeStart,
  timeEnd,
  level,
  shuttlecockProvide,
  description,
}) => {
  // 檢查日期是否有效，如果無效則返回空字串
  const formattedDate = date ? formatDate(date) : "";

  // 檢查時間是否有效，如果無效則返回空字串
  const formattedTimeStart = timeStart ? formatTime(timeStart) : "";
  const formattedTimeEnd = timeEnd ? formatTime(timeEnd) : "";

  return (
    <li className={`${styles.activityItem} cursor-point`}>
      <div className="arenaName">{arenaName}</div>
      <div className="date">{formattedDate}</div>
      <div className="time">
        {formattedTimeStart} - {formattedTimeEnd}
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
