import classnames from "classnames/bind";

import styles from "./Tabs.module.scss";

const cx = classnames.bind(styles);

const Tabs = ({ activeDayIndex, items, clickHandler }) => {
  return (
    <ul className={styles.tabs}>
      {items.map((item, index) => {
        let tabItemClasses = cx({
          tabs__item: true,
          active: activeDayIndex === index,
        });
        return (
          <li
            className={tabItemClasses}
            key={item}
            onClick={() => {
              clickHandler(index);
            }}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};
export default Tabs;
