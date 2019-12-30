import React from 'react';
import PropTypes from 'prop-types';

const Part = ({ title, numExercises }) => {
    return (
        <p>
          {title} {numExercises}
        </p>
    );
};

Part.propTypes = {
    title: PropTypes.string.isRequired,
    numExercises: PropTypes.number.isRequired,
};

export default Part;
