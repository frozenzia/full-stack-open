import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ courseName }) => {
    return (
        <h1>{courseName}</h1>
    );
};

Header.propTypes = {
    courseName: PropTypes.string.isRequired,
};

export default Header;
