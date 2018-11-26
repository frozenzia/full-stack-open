import React from 'react';
import Osa from './Osa';

const Sisalto = ({ parts }) => {
    const listOParts = parts.map((part) =>
        <Osa key={part.id} courseSection={part} />
    );

    return (
        <div>
            {listOParts}
            <p>yhteensä {parts.reduce((accum, part) => accum + part.tehtavia, 0)} tehtävää</p>
        </div>
    );
};

export default Sisalto;
