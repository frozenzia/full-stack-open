import React from 'react';

const Statistic = ({ label, stat }) => {
    return (
        <tr><td>{label}</td><td>{stat}</td></tr>
    );
};

export default Statistic;
