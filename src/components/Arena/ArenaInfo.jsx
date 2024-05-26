import styles from "./ArenaInfo.module.scss";
import { useArena } from "@/contexts/ArenaContext";
import { formatPhoneNumber } from "@/utils/format";

const ArenaInfo = () => {
  const { arena } = useArena();
  // 需優化
  if (!arena) {
    return null;
  }
  return (
    <section className={styles.arenaInfo}>
      <div className={styles.arenaInfoWrapper}>
        <div className={styles.arenaInfoText}>
          <h2 className={styles.title}>
            <span>球館資訊</span>
          </h2>
          <p className="address">地址：{arena.address}</p>
          <p className="phone">連絡電話：{formatPhoneNumber(arena.phone)}</p>
          <p className={styles.website}>
            網站：
            <a href={arena.website}>{arena.website}</a>
          </p>
          <p className="description">提供：</p>
          <p className={styles.descriptionText}>{arena.description}</p>
        </div>
        <div className={styles.arenaInfoImage}>
          <img src={arena.image} alt="arenaImage" className="arenaImg" />
        </div>
      </div>
    </section>
  );
};

export default ArenaInfo;
