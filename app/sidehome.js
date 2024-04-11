"use client";

import { useEffect, useState } from "react";

import { getGeoLocation, getAllWeatherDataByZipCode } from "../lib/api";

const Homepage = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [zipCode, setZipCode] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGeoLocation()
      .then((coordinates) => {
        // If successful, update your component's state with the obtained coordinates
        setLocation(coordinates);
        setError(null); // Reset any previous errors
      })
      .catch((error) => {
        // If an error occurs (either permission denied or geolocation not supported),
        // update your component's state to reflect the error
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      // Construct the OpenCage API URL and fetch
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const zip = data.results[0].components.postcode;
          setZipCode(zip);
        })
        .catch((error) => setError("Failed to fetch zip code"));
    }
  }, [location]);

  useEffect(() => {
    if (zipCode) {
      getAllWeatherDataByZipCode(zipCode) // Assuming this is an async function returning weather data
        .then((data) => {
          setWeatherData(data);
          setError(null); // Reset error state
        })
        .catch(() => setError("Failed to fetch weather data"));
    }
  }, [zipCode]);

  useEffect(() => {
    getGeoLocation
      .then((data) => {
        setLocation(data);
      })
      .catch();
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      {error && <p>Error: {error}</p>}
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <p>Zip Code: {zipCode}</p>
      <p>
        Weather Data: {weatherData ? JSON.stringify(weatherData) : "Loading..."}
      </p>
    </div>
  );
};
export default Homepage;
