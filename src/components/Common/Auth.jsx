import styles from "./Auth.module.scss";
const AuthButton = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};
const AuthLinkText = ({ text }) => {
  return <div className={styles.linkText}>{text}</div>;
};

export { AuthButton, AuthLinkText };
