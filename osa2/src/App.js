import axios from 'axios';
import React from 'react';
import Person from './components/Person';
import Filter from './components/Filter';


class App extends React.Component {

    state = {
        persons: [],
        newName: '',
        newPhone: '',
        filter: '',
    };

    componentDidMount = () => {
        axios.get('http://localhost:3003/persons')
        .then((response) => {
            this.setState({ persons: response.data });
        });
    };

    setNameAndNumber = (event) => {
        event.preventDefault();
        const name2Add = this.state.newName;
        if (!this.state.persons.find((person) => {
            return person.name === name2Add;
        })) {
            const persons = this.state.persons.concat(
                {
                    name: this.state.newName,
                    phone: this.state.newPhone,
                });
            this.setState({ persons, newName: '', newPhone: '' });
        } else alert('Sori, sen niminen ihminen löytyy jo listalta!');
    };

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    };

    handlePhoneChange = (event) => {
        this.setState({ newPhone: event.target.value })
    };

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    };

    render() {
        let currentPeople = [...this.state.persons];
        if (this.state.filter !== '') {
            currentPeople = currentPeople.filter((person) => {
                return person.name.toLowerCase().includes(
                    this.state.filter.toLowerCase()
                );
            });
        }
        const namesToShow = currentPeople.map(person =>
            <Person key={person.name} name={person.name} phone={person.phone} />
        );

        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter
                    value={this.state.filter} handleChange={this.handleFilterChange}
                />

                <h3>Lisää uusi</h3>
                <form onSubmit={this.setNameAndNumber}>
                    <div>
                        nimi:   <input
                                    value={this.state.newName} onChange={this.handleNameChange}
                                />
                    </div>
                    <div>
                        numero: <input
                                    value={this.state.newPhone} onChange={this.handlePhoneChange}
                                />
                    </div>
                    <div>
                        <button type="submit">
                            lisää
                        </button>
                    </div>
                </form>
                <h3>Numerot</h3>
                <table>
                <tbody>{namesToShow}</tbody>
                </table>
            </div>
        )
    }
}

export default App
