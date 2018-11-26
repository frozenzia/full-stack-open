import React from 'react';
import Osa from './Osa';

const Sisalto = ({ parts }) => {
    const listOParts = parts.map((part) =>
        <Osa key={part.id} courseSection={part} />
    );

    return (
        listOParts
    );
};

export default Sisalto;
