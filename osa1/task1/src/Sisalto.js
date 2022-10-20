import React from 'react';

import Osa from './Osa';

const Sisalto = (props) => {
    const { name1, name2, name3, taskAmt1, taskAmt2, taskAmt3 } = props;
    return (
        <div>
            <Osa name={name1} amount={taskAmt1} />
            <Osa name={name2} amount={taskAmt2} />
            <Osa name={name3} amount={taskAmt3} />
        </div>
    );
};

export default Sisalto;
