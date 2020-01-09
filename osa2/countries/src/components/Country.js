import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Country = ({ country }) => {
    const [weather, setWeather] = useState({});
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=b16e2cabb69361b519ab4bb99ec50f40`)
            .then((resp) => {
                console.log('resp: ', resp);
                setWeather(resp.data)
            })
    }, [country.capital]); // run any time country.capital changes

    const temperature = (weather && weather.main && weather.main.temp) || null;
    const windSpeed = (weather && weather.wind && weather.wind.speed) || null;
    const windDirection = (weather && weather.wind && weather.wind.deg) || null;
    const icon = (weather && weather.weather && `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`) || null;
    console.log('icon: ', icon);
    const desc = (weather && weather.weather && weather.weather[0].description) || null;

    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                capital {country.capital}<br />
                population {country.population}<br />
            </p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((lang) => <li key={lang.name}>{lang.name} ({lang.nativeName})</li>)}
            </ul>
            <img alt={`flag of ${country.name}`} src={country.flag} width="200px" border="1px" />
            <h2>Weather in {country.capital}</h2>
            <div><strong>temperature: </strong>{temperature} ℃</div>
            <img alt={desc} src={icon} />
            <div><strong>wind: </strong>{windSpeed}m/s direction {windDirection}°</div>
        </div>
    );
};

Country.propTypes = {
    country: PropTypes.shape({}).isRequired,
};

export default Country;
