import React from 'react';
import Person from './components/Person';
import Filter from './components/Filter';
import Notification from './components/Notification';
import dbService from './services/personsdb';

class App extends React.Component {

    state = {
        persons: [],
        newName: '',
        newPhone: '',
        filter: '',
        successMsg: null,
        successStatus: null,
    };

    componentDidMount = () => {
        dbService.getAll()
        .then((persons) => {
            this.setState({ persons });
        });
    };

    tryAddingUser = (pObject) => {
        dbService.create(pObject)
        .then((person) => {
            const persons = this.state.persons.concat(person);
            this.setState(
                {
                    persons,
                    newName: '',
                    newPhone: '',
                    successMsg: `${person.name} onnistuneesti lisätty`,
                    successStatus: 'success',
                }
            );
            setTimeout(() => {
                this.setState({ successMsg: null, successStatus: null, });
            }, 3500);
        })
        .catch((error) => {
            this.setState({ successMsg: 'lisääminen epäonnistui, valitan', successStatus: 'error', });
            setTimeout(() => {
                this.setState({ successMsg: null, successStatus: null, });
            }, 3500);
        });
    }

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
            this.tryAddingUser(newPerson);
        } else { // offer to change the current phone number of the persion
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
                        successMsg: `puhelinnumero hlölle: ${name2Add} onnistuneesti muutettu`,
                        successStatus: 'success',
                    });
                    setTimeout(() => {
                        this.setState({ successMsg: null, sucessStatus: null, });
                    }, 3500);
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 404) { // user was deleted elsewhere!
                            // first update to current state:
                            dbService.getAll()
                            .then((persons) => {
                                this.setState({ persons });
                            });
                            this.tryAddingUser(newPerson);
                        }
                        else {
                            this.setState({ successMsg: 'oudohko virhe, ei onnistunut', successStatus: 'error', });
                            setTimeout(() => {
                                this.setState({ successMsg: null, successStatus: null, });
                            }, 3500);
                        }
                    }
                    else {
                        this.setState({ successMsg: 'oudohko virhe, ei onnistunut', successStatus: 'error', });
                        setTimeout(() => {
                            this.setState({ successMsg: null, successStatus: null, });
                        }, 3500);
                    }
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
                        successMsg: `${name} onnistuneesti poistettu`,
                        successStatus: 'success',
                    }
                );
                setTimeout(() => {
                    this.setState({ successMsg: null, successStatus: null, });
                }, 3500);
            })
            .catch((error) => {
                console.log('error: ', error);
                this.setState({ successMsg: 'error', successStatus: 'error', });
                setTimeout(() => {
                    this.setState({ successMsg: null, successStatus: null, });
                }, 3500);
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
                <Notification message={this.state.successMsg} className={this.state.successStatus} />
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
