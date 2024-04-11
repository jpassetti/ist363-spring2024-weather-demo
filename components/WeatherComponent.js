"use client";

import React, { useState, useEffect } from "react";

function WeatherComponent() {
  const [zip, setZip] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch weather data if zip code has exactly 5 characters
    if (zip.length === 5) {
      const fetchWeather = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/weather?zip=${zip}`);
          if (!response.ok) {
            throw new Error("Weather data fetch failed");
          }
          const data = await response.json();
          setWeather(data);
        } catch (error) {
          console.error(error);
          setWeather(null); // Reset or handle error state as needed
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    } else {
      // Reset weather data if zip does not meet criteria
      setWeather(null);
    }
  }, [zip]); // This effect depends on `zip`, fetching new data when `zip` changes

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Zip Code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        maxLength="5" // Optionally restrict input length to 5 characters
      />
      {loading && <p>Loading...</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°F</p>
          <p>Conditions: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
export default WeatherComponent;
