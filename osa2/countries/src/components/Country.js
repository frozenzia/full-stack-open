import React from 'react';
import PropTypes from 'prop-types';

const Country = ({ country }) => {
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
            <img alt="flag of {country.name}" src={country.flag} width="100px"/>
        </div>
    );
};

Country.propTypes = {
    country: PropTypes.shape({}).isRequired,
};

export default Country;
