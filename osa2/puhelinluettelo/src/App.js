import React, { useEffect, useRef, useState } from 'react'

import personService from './services/persons';
import Filter from './components/Filter';
import AddUserForm from './components/AddUserForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

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
    const [ actionResult, setActionResult ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then((allPersons) => {
                setPersons(allPersons);
            })
    }, []); // <-- '[]' here indicates to run the effect only after 1st render

    const showActionResult = (text, succeeded) => {
        setActionResult({ text, succeeded });
        setTimeout(() => {
            setActionResult(null);
        }, 5000);
    }

    const handleNameDelete = (id) => {
        const { name } = persons.find(p => p.id === id);
        if (window.confirm(`Delete ${name}?`)) {
            personService
            .destroy(id)
            .then(() => {
                showActionResult(`Deleted ${name}`, true);
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
                        showActionResult(`Changed phone number for ${newName} to: ${newNumber}`, true);
                        setPersons(persons.map((p) => p.id !== id ? p : newPerson));
                    })
                    .catch(() => {
                        showActionResult(`Data for ${newName} already deleted from server?`, false);
                    });
            }
        } else {
            personService
                .create({ name: newName, phone: newNumber })
                .then((allPersons) => {
                    showActionResult(`Added ${newName}`, true);
                    setPersons(allPersons);
                    setNewName('');
                    setNewNumber('');
                    setNameInputFocus();
                })
                .catch((error) => {
                    showActionResult(error.response.data.error, false);
                });
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value);
    const handleNumberChange = (event) => setNewNumber(event.target.value);
    const handleFilterChange = (event) => setNewFilter(event.target.value);

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification
                message={actionResult && actionResult.text}
                succeeded={actionResult && actionResult.succeeded}
            />

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
