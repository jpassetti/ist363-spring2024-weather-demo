import Heading from "./Heading";

import classNames from "classnames/bind";
import styles from "./Section.module.scss";

let cx = classNames.bind(styles);

const Section = ({ children, id, title, backgroundColor }) => {
  let sectionClasses = cx({
    [`section`]: true,
    [`background-color-${backgroundColor}`]: backgroundColor,
  });
  return (
    <section id={id} className={sectionClasses}>
      {children}
    </section>
  );
};
export default Section;
