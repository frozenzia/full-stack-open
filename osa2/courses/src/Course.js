import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Sisalto from './components/Sisalto';
import Yhteensa from './components/Yhteensa';

const Course = ({ course }) => {
    return (
        <div>
            <Header headerText={course.nimi} />
            <Sisalto parts={course.osat} />
            <Yhteensa parts={course.osat} />
        </div>


    );
};

Course.propTypes = {
    course: PropTypes.shape({
        nimi: PropTypes.string.isRequired,
        osat: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
};

export default Course;
