import styles from "./Form.module.scss";

const FormGroup = ({ children }) => (
  <div className={styles.formGroup}>{children}</div>
);

export default FormGroup;
