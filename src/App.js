import React from 'react';
import "./App.css";
import { useState } from "react";

const api = {
  key: "enter api key here",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

 
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
 
        <h1>Weather App</h1>

  
        <div>
          <input
            type="text"
            placeholder="Enter name of city..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

   
        {typeof weather.main !== "undefined" ? (
          <div>
        
            <p>Weather in the city:{weather.name}</p>
            <p>temperature:{weather.main.temp}°C</p>
            <p>Humidity:{weather.main.humidity}</p>
            <p>Sea level:{weather.main.sea_level}</p>
              <p>Ground level:{weather.main.grnd_level}</p>
          </div>
        ) : (
          <h3>Enter valid city</h3>
        )}
      </header>
    </div>
  );
}

export default App;
