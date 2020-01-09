import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';

function App() {
    const [countries, setCountries] = useState([]);
    const [countryFilter, setCountryFilter] = useState('');
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((resp) => {
                setCountries(resp.data);
            });
    }, []); // <-- '[]' here means that effect will only be run after 1st render

    const handleFilterChange = (event) => setCountryFilter(event.target.value);

    return (
        <div className="App">
            <Filter
                prompt="find countries"
                filterString={countryFilter}
                onFilterChange={handleFilterChange}
            />
            <Countries
                countries={countries}
                filterString={countryFilter}
            />
        </div>
    );
}

export default App;
