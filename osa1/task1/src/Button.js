import React from 'react';

const Button = ({ handleClick, text }) => {
    return (
        <input type="button" className="btn" onClick={handleClick} value={text} />
    );
};

export default Button;
