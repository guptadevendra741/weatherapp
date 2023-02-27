import React from "react";
import { useState } from "react";
import Weather from './Weather';
import './Weatherapp.css';

export default function Search() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [lastentry, setLastentry] = useState([]);
    const [error, setError] = useState(" ");


    const API_KEY = '56cd91436964bd8bd08473178740ef01';
    const API_URL = 'https://openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q='
    async function handleSearch(event) {
        event.preventDefault();

        if (city === "") {
            setError('PLease enter valid city name')
            return;
        }

        try {
            const result = await fetch('${API_URL}${city}');
            const data = await result.json();

            if (result.ok) {
                setWeather({
                    temperature: data.main.temp,
                    humidity: data.main.humidity,
                    slevel: data.main.sea_level,
                    glevel: data.main.grnd_level,
                });

                setLastentry((entries) => {
                    const updated_entries = [...entries, city];
                    return updated_entries.slice(-3);
                });

                setError("");

            } else {
                setError("Please enter a valid city name");
                setWeather(null);
            }
        } catch (error) {
            setError(" OPPs!! Something went wrong. Try again later...")
            setWeather(null);
        }

    }

    return (

        <div className="main">
            <h1>WEATHER APP</h1><br />
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Enter city name" value={city} onChange={(event) => setCity(event.target.value)} />
                <button type="submit" >Search</button>
            </form>

            {weather && (
                <Weather
                    city={city}
                    temperature={weather.main.temperature}
                    humidity={weather.main.humidity}
                    glevel={weather.main.grnd_level}
                    slevel={weather.main.sea_level}
                />
            )} 

            {error && <p>{error}</p>}

            <h2>Last 3 city entries:</h2>
            <ul>
                {lastentry.map((entry, i) => (
                    <li key={i}>{entry}</li>
                ))}
            </ul>
        </div>

    )
}