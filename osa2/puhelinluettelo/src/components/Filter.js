import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filterString, onFilterChange }) => {
    return (
            <p>
                filter shown with   <input
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
