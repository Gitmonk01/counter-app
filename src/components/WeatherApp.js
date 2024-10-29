import { useState } from 'react';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch latitude and longitude for the city using Nominatim API
  const fetchCoordinates = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
      );
      const data = await response.json();

      if (data.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon } = data[0]; // Get latitude and longitude
      fetchWeather(lat, lon); // Fetch weather using lat and lon
    } catch (error) {
      setError('City not found or invalid input');
      setWeather(null);
      setLoading(false);
    }
  };

  // Fetch weather data using Open-Meteo API
  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await response.json();
      setWeather(data.current_weather); // Set the current weather data
      setError(null); // Clear error on success
    } catch (error) {
      setError('Unable to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather App (Open-Meteo)</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchCoordinates}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h2>Current Weather in {city}</h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Wind Speed: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
