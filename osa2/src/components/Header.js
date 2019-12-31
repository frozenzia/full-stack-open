import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ headerText }) => {
    return (
        <h2>{headerText}</h2>
    );
};

Header.propTypes = {
    headerText: PropTypes.string.isRequired,
};

export default Header;
