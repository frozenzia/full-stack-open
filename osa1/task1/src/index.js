import React from 'react'
import ReactDOM from 'react-dom'

import Otsikko from './Otsikko';
import Sisalto from './Sisalto';
import Yhteensa from './Yhteensa';

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ],
    };

    return (
        <div>
            <Otsikko course={kurssi.nimi} />
            <Sisalto parts={kurssi.osat} />
            <Yhteensa parts={kurssi.osat} />
        </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
