import React from 'react';
import PropTypes from 'prop-types';

import Country from './Country';

const Countries = ({ countries, filterString, onShowCountryClicked }) => {
    const filterCountries = () => {
        return filterString === ''
        ? countries
        : countries.filter((country) => country.name.common.toLowerCase().includes(filterString.toLowerCase()))
    }

    const filteredCountries = filterCountries();
    console.log('filteredCountries: ', filteredCountries);

    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length > 1 || filteredCountries.length === 0) {
        return filteredCountries.map(country => (
            <div key={country.name.common}>
                {country.name.common} <button onClick={() => onShowCountryClicked(country)}>show</button>
            </div>
        ));
    }
    return <Country country={filteredCountries[0]}/>;
};

Countries.propTypes = {
    countries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    filterString: PropTypes.string.isRequired,
    onShowCountryClicked: PropTypes.func.isRequired,
};

export default Countries;
