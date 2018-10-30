import React from 'react';

import Osa from './Osa';

const Sisalto = (props) => {
    const [ part1, part2, part3 ] = props.parts;
    return (
        <div>
            <Osa name={part1.nimi} amount={part1.tehtavia} />
            <Osa name={part2.nimi} amount={part2.tehtavia} />
            <Osa name={part3.nimi} amount={part3.tehtavia} />
        </div>
    );
};

export default Sisalto;
