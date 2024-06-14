import styles from "./Form.module.scss";
const FormBox = ({ children, onSubmit }) => {
  return (
    <div className="container">
      <section className={styles.formBox}>
        <form onSubmit={onSubmit}>{children}</form>
      </section>
    </div>
  );
};

export default FormBox;
