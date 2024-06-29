import WeatherCard from "./WeatherCard";

function WeatherDisplay({ displayCity, weather }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      <h2>Weather {displayCity}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <WeatherCard
            key={date}
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            isToday={i == 0}
          />
        ))}
      </ul>
    </div>
  );
}

export default WeatherDisplay;
