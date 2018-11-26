import React from 'react';
import Otsikko from './Otsikko';
import Sisalto from './Sisalto';

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko name={kurssi.nimi} />
            <Sisalto parts={kurssi.osat} />
        </div>
    );
};

export default Kurssi;
