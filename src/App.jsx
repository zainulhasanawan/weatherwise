import { useState } from "react";
import { getWeather } from "./services/apiWeather";
import SearchCity from "./components/SearchCity";
import WeatherDisplay from "./components/WeatherDisplay";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayCity, setDisplayCity] = useLocalStorage("displayCity", "");
  const [weather, setWeather] = useLocalStorage("weather", {});
  const [error, setError] = useState("");

  const handleGetWeather = async () => {
    setIsLoading(true);
    setError("");
    try {
      await getWeather(city, setDisplayCity, setWeather, setError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleGetWeather();
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="app">
      <h1>WeatherWise⛅</h1>

      <SearchCity
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {isLoading && <p className="loader">Loading...</p>}

      {error && <p className="loader">{error}</p>}

      {weather.weathercode && !error && (
        <WeatherDisplay displayCity={displayCity} weather={weather} />
      )}
    </div>
  );
}

export default App;
