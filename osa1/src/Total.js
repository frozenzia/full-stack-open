import React from 'react';
import PropTypes from 'prop-types';

const Total = ({ parts }) => {
    return (
        <p>Number of exercises {parts.reduce((accum, part) => {
            return accum + part.exercises;
        }, 0)}</p>
    );
};

Total.propTypes = {
    parts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        exercises: PropTypes.number.isRequired,
    })).isRequired
};

export default Total;
