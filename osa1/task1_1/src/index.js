import React from 'react'
import ReactDOM from 'react-dom'

import Otsikko from './Otsikko';
import Sisalto from './Sisalto';
import Yhteensa from './Yhteensa';

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
        <Otsikko course={kurssi} />
        <Sisalto
            name1={osa1} taskAmt1={tehtavia1}
            name2={osa2} taskAmt2={tehtavia2}
            name3={osa3} taskAmt3={tehtavia3}
        />
        <Yhteensa val1={tehtavia1} val2={tehtavia2} val3={tehtavia3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
