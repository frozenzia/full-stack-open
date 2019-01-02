import React from 'react';
import Person from './components/Person';
import Filter from './components/Filter';
import dbService from './services/personsdb';

class App extends React.Component {

    state = {
        persons: [],
        newName: '',
        newPhone: '',
        filter: '',
    };

    componentDidMount = () => {
        dbService.getAll()
        .then((persons) => {
            this.setState({ persons });
        });
    };

    setNameAndNumber = (event) => {
        event.preventDefault();
        const name2Add = this.state.newName;
        const existingPerson = this.state.persons.find((person) => {
            return person.name === name2Add;
        });
        if (!existingPerson) {
            const newPerson =   {
                                    name: this.state.newName,
                                    phone: this.state.newPhone,
                                };
            dbService.create(newPerson)
            .then((person) => {
                const persons = this.state.persons.concat(person);
                this.setState({ persons, newName: '', newPhone: '' });
            });
        } else {
            if (window.confirm(`${name2Add} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                const newPerson =   {
                                        ...existingPerson,
                                        phone: this.state.newPhone,
                                    };
                dbService.update(newPerson.id, newPerson)
                .then((changedPerson) => {
                    const persons = this.state.persons.filter(p => p.id !== changedPerson.id);
                    this.setState({
                        persons: persons.concat(changedPerson),
                        newName: '',
                        newPhone: '',
                    });
                });
            }
        };
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

    handleDelete = (id, name) => () => {
        if (window.confirm(`poistetaanko ${name}?`)) {
            dbService.remove(id)
            .then(() => {
                this.setState(
                    {
                        persons: this.state.persons.filter((p) => {
                            return p.id !== id;
                        }),
                    }
                );
            });
        }
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
            <Person
                key={person.name}
                name={person.name}
                phone={person.phone}
                handleDelete={this.handleDelete(person.id, person.name)}
            />
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
