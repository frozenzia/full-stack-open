import React from 'react';
import PropTypes from 'prop-types';

const Persons = ({ persons, filterString }) => {
    const getPeopleToShow = () => {
        const personsToMap = filterString === ''
        ? persons
        : persons.filter((person) => person.name.toLowerCase().includes(filterString))
        return personsToMap.map(person => <p key={person.name}>{person.name}  {person.phone}</p>)
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
