import Image from "next/image";

import Col from "./Col";
import Description from "./Description";
import Row from "./Row";
import Temp from "./Temp";

import styles from "./List.module.scss";

const List = ({ list, activeDay }) => {
  return (
    <div className={styles.weather__list}>
      {list
        .filter((block) => {
          const date = new Date(block.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          return dayName === activeDay;
        })
        .map((day) => {
          const date = new Date(day.dt * 1000);
          const time = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          });
          return (
            <Row
              key={day.dt}
              className={styles.weather__list__item}
              borderBottom={1}
              paddingTop={2}
              paddingBottom={2}
            >
              <Col xs={3} sm={2}>
                <span className={styles.weather__time}>{time}</span>
              </Col>
              <Col xs={5} sm={3}>
                <Temp amount={day.main.temp} />
                <br />
                <Description text={day.weather[0].description} />
              </Col>
              <Col xs={4} sm={3}>
                <Image
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="Weather icon"
                  width={50}
                  height={50}
                />
              </Col>
            </Row>
          );
        })}
    </div>
  );
};
export default List;
