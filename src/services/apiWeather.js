import { convertToFlag } from "../utilities/helpers";

export async function getWeather(city, setDisplayCity, setWeather, setError) {
  try {
    // 1) Getting location (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoRes.json();
    console.log(geoData);

    if (!geoData.results) throw new Error("City not found");

    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0);
    setDisplayCity(`${name} ${convertToFlag(country_code)}`);

    // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    setWeather(weatherData.daily);
  } catch (err) {
    setError(err.message);
  }
}
