import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Country = ({ country }) => {
    const [weather, setWeather] = useState({});
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`)
            .then((resp) => {
                console.log('resp: ', resp);
                setWeather(resp.data)
            })
    }, [country.capital, api_key]); // run any time country.capital changes

    const temperature = (weather.main && weather.main.temp) || null;
    const windSpeed = (weather.wind && weather.wind.speed) || null;
    const windDirection = (weather.wind && weather.wind.deg) || null;
    const icon = (weather.weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`) || null;
    console.log('icon: ', icon);
    const desc = (weather.weather && weather.weather[0].description) || null;

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                capital {country.capital}<br />
                population {country.population}<br />
            </p>
            <h2>languages</h2>
            <ul>
                {Object.keys(country.languages).map((lang) => <li key={lang}>{country.languages[lang]} ({country.name.nativeName[lang].common})</li>)}
            </ul>
            <img alt={`flag of ${country.name.common}`} src={country.flags.png} width="200px" border="1px" />
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
