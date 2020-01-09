import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ prompt, filterString, onFilterChange }) => {
    return (
            <p>
                {prompt}   <input
                                value={filterString}
                                onChange={onFilterChange}
                            />
            </p>

    );
};

Filter.propTypes = {
    filterString: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
