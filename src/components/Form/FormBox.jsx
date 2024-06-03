import styles from "./Form.module.scss";
const FormBox = ({ children }) => {
  return (
    <div className="container">
      <section className={styles.formBox}>
        <form>{children}</form>
      </section>
    </div>
  );
};

export default FormBox;
