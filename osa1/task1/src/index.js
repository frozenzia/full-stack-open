import React from 'react'
import ReactDOM from 'react-dom'

import Otsikko from './Otsikko';
import Sisalto from './Sisalto';
import Yhteensa from './Yhteensa';

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
        <Otsikko course={kurssi} />
        <Sisalto part1={osa1} part2={osa2} part3={osa3} />
        <Yhteensa val1={osa1.tehtavia} val2={osa2.tehtavia} val3={osa3.tehtavia} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
