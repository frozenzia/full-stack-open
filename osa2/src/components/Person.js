import React from 'react';

const Person = ({ name, phone, id, handleDelete }) => (
    <tr>
        <td>{name}</td>
        <td>{phone}</td>
        <td><button onClick={handleDelete}>poista</button></td>
    </tr>
)

export default Person;
