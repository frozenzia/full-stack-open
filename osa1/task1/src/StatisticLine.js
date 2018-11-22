import React from 'react';

const StatisticLine = ({ label, stat }) => {
    return (
        <tr><td>{label}</td><td>{stat}</td></tr>
    );
};

export default StatisticLine;
