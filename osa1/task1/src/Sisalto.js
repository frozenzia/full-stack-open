import React from 'react';

const Sisalto = (props) => {
    const { name1, name2, name3, taskAmt1, taskAmt2, taskAmt3 } = props;
    return (
        <div>
            <p>{name1} {taskAmt1}</p>
            <p>{name2} {taskAmt2}</p>
            <p>{name3} {taskAmt3}</p>
        </div>
    );
};

export default Sisalto;
