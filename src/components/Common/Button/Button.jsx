import styles from "./Button.module.scss";

export const Button = ({ text, className, onClick, type }) => {
  return (
    <div className={styles.buttonControl}>
      <button
        className={`${styles.commonButton} ${className}`}
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};
