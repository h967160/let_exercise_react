import { Button } from "@/components/Common/Button/Button";
import styles from "./ActivityCard.module.scss";
import { formatDate, formatTime } from "@/utils/format";
import { useActivity } from "@/contexts/ActivityContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ActivityCard = ({
  arenaName,
  date,
  timeStart,
  timeEnd,
  levelId,
  activityId,
  userId,
  hostId,
}) => {
  const { getLevelName, deleteActivity } = useActivity();
  const navigate = useNavigate();

  const handleEditClick = (event) => {
    event.stopPropagation(); // 防止事件冒泡到父元素
    navigate(`/activities/${activityId}/edit`);
  };

  const handleDeleteClick = async (event) => {
    event.stopPropagation(); // 防止事件冒泡到父元素

    // 判斷是否為活動的主辦者
    if (userId !== hostId) {
      Swal.fire("無法刪除", "您不是活動的主辦者，無法刪除此活動", "error");
      return;
    }

    // 使用 SweetAlert 顯示確認框
    const confirmResult = await Swal.fire({
      title: "確定刪除活動？",
      text: "刪除後將無法恢復！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    });

    // 如果使用者確定刪除，執行刪除活動的操作
    if (confirmResult.isConfirmed) {
      const result = await deleteActivity(activityId);
      if (result.status === "Success") {
        Swal.fire("刪除成功！", "", "success");
        navigate(`/profile`);
      } else {
        Swal.fire("刪除失敗！", result.message, "error");
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/activities/${activityId}`);
  };

  return (
    <div className={`${styles.card} cursor-point`} onClick={handleCardClick}>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{arenaName}</h3>
        <p className={styles.cardText}>{formatDate(date)}</p>
        <p className={styles.cardText}>
          {formatTime(timeStart)}-{formatTime(timeEnd)}
        </p>
        <p className={styles.cardText}>{getLevelName(levelId)}</p>
        <div className={styles.buttonBox}>
          <Button
            text={"編輯"}
            className={styles.cardEditButton}
            onClick={handleEditClick}
          ></Button>
          <Button
            text={"刪除"}
            className={styles.cardDeleteButton}
            onClick={handleDeleteClick}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
