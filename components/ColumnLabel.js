import styles from "./ColumnLabel.module.scss";

const ColumnLabel = ({ children }) => {
  return <h3 className={styles.columnLabel}>{children}</h3>;
};
export default ColumnLabel;
