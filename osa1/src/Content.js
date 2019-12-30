import React from 'react';
import PropTypes from 'prop-types';

import Part from './Part';

const Content = ({ parts }) => {
    return parts.map(p =>
        <Part key={p.name} title={p.name} numExercises={p.exercises} />
    );
};

Content.propTypes = {
    parts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        exercises: PropTypes.number.isRequired,
    })).isRequired
};

export default Content;
