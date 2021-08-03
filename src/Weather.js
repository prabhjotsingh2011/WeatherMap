import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function searchCity(response) {
    console.log(response);
    setWeatherData({
      ready: true,
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      maxTemp: response.data.main.temp_max,
      minTemp: response.data.main.temp_min,
      feelsLike: response.data.main.feels_like,
      pressure: response.data.main.pressure,
      visibility: response.data.visibility,
      clouds: response.data.clouds.all,
      humidity: response.data.main.humidity,
      weatherMain: response.data.weather[0].main,
      description: response.data.weather[0].description,
      windSpeed: response.data.wind.speed,
      coordinates: response.data.coord,
      icon: response.data.weather[0].icon,
      date: new Date(response.data.dt * 1000),
    });
  }

  function search() {
    let apiKey = "d472df3cc457416a11c7918c00d8eaa1";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(searchCity);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row cen">
            <div className="col-3">
              <input
                type="search"
                placeholder="Enter a City..."
                className="form-control"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <button type="submit" className="searchButton">
                🔎
              </button>
            </div>
          </div>
        </form>
        <div className="row cen">
          <div className="col-5">
            <WeatherInfo data={weatherData} />
          </div>
          <div className="col-7">
            <h2>DAILY FORECAST</h2>
            <WeatherForecast coordinates={weatherData.coordinates} />
          </div>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading. . .";
  }
}
