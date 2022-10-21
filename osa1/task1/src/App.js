import React, { useState } from 'react';

import Button from './Button';
import Otsikko from './Otsikko';

const giveFeedback = 'Anna palautetta';
const stats = 'statistiikka';
const good = 'hyvä';
const neutral = 'neutraali';
const bad = 'huono';

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
            <Otsikko text={giveFeedback} />
            <Button text={good} handleClick={addOne('good')} />
            <Button text={neutral} handleClick={addOne('neutral')} />
            <Button text={bad} handleClick={addOne('bad')} />
            <Otsikko text={stats} />
            <p>{good} {state.good}</p>
            <p>{neutral} {state.neutral}</p>
            <p>{bad} {state.bad}</p>
        </div>
    )
}

export default App;