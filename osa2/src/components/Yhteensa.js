import React from 'react';

const Yhteensa = ({ parts }) => {
    // props.parts is an array of objects - we want to sum the
    // tehtavia values of all the objects
    const sum = parts.reduce((accum, part) => {
        return accum + part.tehtavia;
    },0);
    return (
          <p><strong>yhteensä {sum} tehtävää</strong></p>
    );
};

export default Yhteensa;
