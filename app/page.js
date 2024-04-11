"use client";

import { useEffect, useState, Fragment } from "react";

import Col from "../components/Col";
import ColumnLabel from "../components/ColumnLabel";
import Container from "../components/Container";
import Description from "../components/Description";
import Heading from "../components/Heading";
import Image from "next/image";
import List from "../components/List";
import Row from "../components/Row";
import Section from "../components/Section";
import Tabs from "../components/Tabs";
import Temp from "../components/Temp";

import {
  getAllWeatherData,
  getGeoLocationPractice,
  getWeatherDataByCoordinates,
  geoPractice,
} from "../lib/api";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // useEffect is a React hook that runs after the first render of the component
  // useEffect(() => {
  //   getAllWeatherData()
  //     .then((data) => {
  //       setWeatherData(data);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }, []);

  useEffect(() => {
    getGeoLocationPractice()
      .then((data) => {
        setLocation(data);
      })
      .catch(() => {
        setError("Geolocation permission denied");
      });
  }, []);

  useEffect(() => {
    location &&
      getWeatherDataByCoordinates(location)
        .then((data) => {
          setWeatherData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(`Error: ${error.message}`);
        });
  }, [location]);

  useEffect(() => {
    weatherData && console.log({ weatherData });
    const tempWeek = [];
    weatherData?.list.forEach((day) => {
      // convert unix timestamp of seconds to milliseconds
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      if (!tempWeek.includes(dayName)) {
        tempWeek.push(dayName);
      }
    });
    setDaysOfWeek(tempWeek);
  }, [weatherData]);

  return (
    <Fragment>
      {isLoading ? (
        <Section>
          <Container>
            <Row>
              <Col>
                <Heading level={1}>Loading...</Heading>
              </Col>
            </Row>
          </Container>
        </Section>
      ) : (
        <Fragment>
          {weatherData && (
            <Section backgroundColor="lightgray">
              <Container>
                <Row>
                  <Col>
                    <ColumnLabel>Location</ColumnLabel>
                    <Heading level={2}>{weatherData.city.name}</Heading>
                  </Col>
                </Row>
              </Container>
            </Section>
          )}
          <Section>
            <Container>
              <Row>
                <Col sm={4}>
                  <ColumnLabel>Today</ColumnLabel>
                  {weatherData && (
                    <div>
                      <Temp amount={weatherData.list[0].main.temp} size="xl" />
                      <Description
                        text={weatherData.list[0].weather[0].description}
                      />
                      <Image
                        src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}

                  {error && <p>Error: {error}</p>}
                </Col>
                <Col sm={8}>
                  {daysOfWeek && (
                    <>
                      <ColumnLabel>Next 5 Days</ColumnLabel>
                      <Tabs
                        items={daysOfWeek}
                        activeDayIndex={activeDayIndex}
                        clickHandler={setActiveDayIndex}
                      />
                      {weatherData && (
                        <List
                          list={weatherData.list}
                          activeDay={daysOfWeek[activeDayIndex]}
                        />
                      )}
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </Section>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Homepage;
