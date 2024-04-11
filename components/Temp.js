import classnames from "classnames/bind";

import styles from "./Temp.module.scss";

const cx = classnames.bind(styles);

const Temp = ({ amount, size, units }) => {
  const displayUnit = units === "metric" ? "C" : "F";

  const tempClasses = cx({
    temp: true,
    temp__xl: size === "xl",
  });
  return (
    <span className={tempClasses}>
      {Math.floor(amount)}°{displayUnit}
    </span>
  );
};
export default Temp;
