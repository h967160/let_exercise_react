import styles from "./Button.module.scss";

export const Button = ({ text, className, onClick }) => {
  return (
    <div className={styles.buttonControl}>
      <button
        className={`${styles.commonButton} ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
