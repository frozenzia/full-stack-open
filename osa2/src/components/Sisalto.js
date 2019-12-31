import React from 'react';

import Osa from './Osa';

const Sisalto = ({ parts }) => {
    const partRows = parts.map(part => <Osa key={part.nimi} name={part.nimi} amount={part.tehtavia} />);
    return (
        <div>
            {partRows}
        </div>
    );
};

export default Sisalto;
