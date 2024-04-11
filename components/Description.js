import styles from "./Description.module.scss";

const Description = ({ text }) => {
  return <p className={styles.description}>{text}</p>;
};
export default Description;
