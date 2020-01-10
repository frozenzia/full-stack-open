import React from 'react';
import PropTypes from 'prop-types';

const Persons = ({ persons, filterString, onPersonDelete }) => {
    const getPeopleToShow = () => {
        const personsToMap = filterString === ''
        ? persons
        : persons.filter((person) => person.name.toLowerCase().includes(filterString.toLowerCase()))
        return personsToMap
            .map(person =>
                <p key={person.name}>
                    {person.name} {person.phone}
                    <button onClick={() => onPersonDelete(person.id)}>delete</button>
                </p>
            )
    }

    return (
        getPeopleToShow()
    );
};

Persons.propTypes = {
    persons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    filterString: PropTypes.string.isRequired,
};

export default Persons;
