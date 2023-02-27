import React from "react";

export default function Weather({city, temperature, humidity,slevel, glevel}){

    return(
        <div>
            <h1>Weather In The City:{city}</h1>
            <p>Temperature : {temperature} degree Celcius</p>
            <p>Humidity: {humidity} %</p>
            <p>Sea level: {slevel} m</p>
            <p>Ground level: {glevel} m</p>
        </div>
    )
}