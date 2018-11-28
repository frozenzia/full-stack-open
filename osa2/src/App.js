import axios from 'axios';
import React from 'react';
import Filter from './components/Filter';


class App extends React.Component {

    state = {
        countries: [],
        filter: '',
        chosenCountry: '',
    };

    componentDidMount = () => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then((response) => {
            this.setState({ countries: response.data });
        });
    };

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value, chosenCountry: '' })
    };

    handleClick = (alpha2Code) => () => {
        this.setState({ chosenCountry: alpha2Code })
    };

    render() {
        let currentCountries = [...this.state.countries];
        if (this.state.filter !== '') {
            currentCountries = currentCountries.filter((c) => {
                return c.name.toLowerCase().includes(
                    this.state.filter.toLowerCase()
                );
            });
        }

        let countryListOrStats = null;
        if (currentCountries.length === 1 || this.state.chosenCountry !== '') {
            let country = currentCountries[0];
            if (this.state.chosenCountry !== '') {
                country = currentCountries.find((c) => {
                    return c.alpha2Code === this.state.chosenCountry;
                });
            }
            const altString = `National flag of ${country.name}`;

            countryListOrStats = (
                <div>
                    <h2>{country.name} ({country.nativeName})</h2>
                    <p>capital: {country.capital}</p>
                    <p>population: {country.population}</p>
                    <img src={country.flag} alt={`National flag of ${country.name}`} width="200px" border="1px solid black"></img>

                </div>
            );
        } else if (1 < currentCountries.length && currentCountries.length < 10) {
            countryListOrStats = currentCountries.map(c =>
                <div
                    key={c.alpha2Code}
                    onClick={this.handleClick(c.alpha2Code)}
                    >
                        {c.name}
                    </div>
                );
        } else if (currentCountries.length >= 10) {
            countryListOrStats = <div>too many matches, specify another filter</div>
        } else {
            countryListOrStats = <div>no matches, specify another filter</div>
        }

        return (
            <div>
                <h2>Country research</h2>
                <Filter
                    value={this.state.filter} handleChange={this.handleFilterChange}
                />
                {countryListOrStats}
            </div>
        )
    }
}

export default App
