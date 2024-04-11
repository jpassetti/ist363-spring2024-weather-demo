async function getData() {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?zip=13244&appid=1c907f9d4d1e71eabf1bc718c4f78758&units=imperial"
  );
  const data = await response.json();
  return data;
}

export default async function Page() {
  const data = await getData();
  console.log(data.list[0]);
  return (
    <main>
      {/* <h1>Weather in {data.name}</h1>
        <p>Temperature: {data.main.temp}°F</p> */}
      {data.list.map((item) => {
        const dateObj = new Date(item.dt_txt);
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const formattedDate = dateObj.toLocaleDateString("en-US", options);

        return (
          <div key={item.dt}>
            <h2>{formattedDate}</h2>
            <p>Temperature: {item.main.temp}°F</p>
            <p>Conditions: {item.weather[0].description}</p>
          </div>
        );
      })}
    </main>
  );
}
