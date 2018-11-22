import React, { useState } from 'react';

import Button from './Button';
import Otsikko from './Otsikko';
import strings from './strings';
import Statistics from './Statistics';

const App = () => {
    const [state, setState] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    const addOne = (option) => () => setState({
        ...state,
        [option]: state[option] += 1,
    });

    return (
        <div>
            <Otsikko text={strings.headers.giveFeedback} />
            <Button text={strings.labels.good} handleClick={addOne('good')} />
            <Button text={strings.labels.neutral} handleClick={addOne('neutral')} />
            <Button text={strings.labels.bad} handleClick={addOne('bad')} />
            <Statistics feedback={state} />
        </div>
    )
}

export default App;