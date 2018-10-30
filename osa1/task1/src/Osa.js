import React from 'react';

const Osa = (props) => {
    const { name, amount } = props;
    return (
        <p>{name} {amount}</p>
    );
};

export default Osa;
