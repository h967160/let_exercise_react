import styles from "./ArenaInfo.module.scss";

const ArenaInfo = () => {
  return (
    <section className={styles.arenaInfo}>
      <div className={styles.arenaInfoWrapper}>
        <div className={styles.arenaInfoText}>
          <h2 className={styles.title}>
            <span>球館資訊</span>
          </h2>
          <p className="address">地址：臺北市松山區南京東路4段10號</p>
          <p className="phone">連絡電話：02-25702330#6552</p>
          <p className={styles.website}>
            網站：
            <a href="https://sports.tms.gov.tw/venues/">
              https://sports.tms.gov.tw/venues/
            </a>
          </p>
          <p className="description">提供：</p>
          <p className={styles.descriptionText}>
            無障礙坡道：1, 無障礙廁所：2.籃球場 : 不開放, 羽球場(館) : 不開放,
            租借資訊 : 付費對外場地租借 , 以官方網站資訊為主
          </p>
        </div>
        <div className={styles.arenaInfoImage}>
          <img
            src="https://iplay.sa.gov.tw/Upload/photogym/20140704090451_UF2UH0WTJUBZY03XXLBU.jpg"
            alt="arenaImage"
            className="arenaImg"
          />
        </div>
      </div>
    </section>
  );
};

export default ArenaInfo;
