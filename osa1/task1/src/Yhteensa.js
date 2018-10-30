import React from 'react';

const Yhteensa = (props) => {
    // props.parts is an array of objects - we want to sum the
    // tehtavia values of all the objects
    const sum = props.parts.reduce((accum, part) => {
        return accum + part.tehtavia;
    },0);
    return (
          <p>yhteensä {sum} tehtävää</p>
    );
};

export default Yhteensa;
