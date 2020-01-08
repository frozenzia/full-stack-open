import React, { useRef, useState } from 'react'

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
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', phone: '040-1234567' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    const handleAddName = (event) => {
        event.preventDefault();

        const currentNames = persons.map(p => p.name);
        if (currentNames.includes(newName)) {
            alert(`${newName} is already added to the phonebook`)
        } else {
            setPersons(persons.concat({ name: newName, phone: newNumber }));
            setNewName('');
            setNewNumber('');
            setNameInputFocus();
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
            <Persons persons={persons} filterString={newFilter} />
        </div>
    )
}

export default App
