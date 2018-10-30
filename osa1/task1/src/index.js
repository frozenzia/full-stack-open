import React from 'react'
import ReactDOM from 'react-dom'

import Otsikko from './Otsikko';
import Sisalto from './Sisalto';
import Yhteensa from './Yhteensa';

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
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
    ];

    return (
    <div>
        <Otsikko course={kurssi} />
        <Sisalto parts={osat} />
        <Yhteensa parts={osat} />
    </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
