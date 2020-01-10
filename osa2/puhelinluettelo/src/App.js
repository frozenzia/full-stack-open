import React, { useEffect, useRef, useState } from 'react'

import personService from './services/persons';
import Filter from './components/Filter';
import AddUserForm from './components/AddUserForm';
import Persons from './components/Persons';

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus()
    }
    return [ htmlElRef, setFocus ]
}


const App = () => {
    const [ nameInputRef, setNameInputFocus ] = useFocus();
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then((allPersons) => {
                setPersons(allPersons);
            })
    }, []); // <-- '[]' here indicates to run the effect only after 1st render

    const handleNameDelete = (id) => {
        const { name } = persons.find(p => p.id === id);
        if (window.confirm(`Delete ${name}?`)) {
            personService
            .destroy(id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== id));
            });
        }
    }

    const handleAddName = (event) => {
        event.preventDefault();

        const currentNames = persons.map(p => p.name);
        if (currentNames.includes(newName)) {
            if (window.confirm(`${newName} is already here, shall we replace the old number with the new one?`)) {
                const index = persons.findIndex(p => p.name === newName);
                const id = persons[index].id;
                personService
                    .update(id, ({ ...persons[index], phone: newNumber }))
                    .then((newPerson) => {
                        setPersons(persons.map((p) => p.id !== id ? p : newPerson));
                    });
            }
        } else {
            personService
                .create({ name: newName, phone: newNumber })
                .then((createdPerson) => {
                    setPersons(persons.concat(createdPerson));
                    setNewName('');
                    setNewNumber('');
                    setNameInputFocus();
                });
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value);
    const handleNumberChange = (event) => setNewNumber(event.target.value);
    const handleFilterChange = (event) => setNewFilter(event.target.value);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterString={newFilter} onFilterChange={handleFilterChange} />

            <h2>add a new</h2>
            <AddUserForm
                onSubmit={handleAddName}
                nameString={newName}
                onNameChange={handleNameChange}
                nameInputRef={nameInputRef}
                phoneString={newNumber}
                onPhoneChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <Persons persons={persons} filterString={newFilter} onPersonDelete={handleNameDelete} />
        </div>
    )
}

export default App
