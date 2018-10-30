import React from 'react';

const Yhteensa = (props) => {
    const { val1, val2, val3 } = props;
    return (
          <p>yhteensä {val1 + val2 + val3} tehtävää</p>
    );
};

export default Yhteensa;
