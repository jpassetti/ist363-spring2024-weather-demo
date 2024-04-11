const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export async function getAllWeatherData() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?zip=13244&appid=${apiKey}&units=imperial`
  );
  const data = await response.json();
  return data;
}

export async function getAllWeatherDataByZipCode(zipCode) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}&units=imperial`
  );
  const data = await response.json();
  return data;
}

export async function getWeatherDataByCoordinates(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=imperial`
  );
  const data = await response.json();
  return data;
}

export const geoPractice = () => {
  // state: pending (default), resolved, rejected
  // two functions are needed to change the state: resolve, reject
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        () => {
          reject("Geolocation permission denied");
        }
      );
    } else {
      reject("Geolocation is not supported by this browser");
    }
  });
};

export const getGeoLocationPractice = () => {
  return new Promise((resolve, reject) => {
    // does the browser support geolocation?
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        () => {
          reject("Geolocation permission denied");
        }
      );
    } else {
    }
  });
};

export const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        () => reject("Geolocation permission denied")
      );
    } else {
      reject("Geolocation is not supported by this browser");
    }
  });
};
