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

    const noValuesYet = 'ei vielä palautetta';
    const totAnswers = (Object.values(state)).reduce((accum, val) => accum + val, 0);
    const average = parseFloat(((state.good*1 - state.bad*1) / totAnswers).toFixed(1));
    const percentPositive = parseFloat(((state.good / totAnswers) * 100).toFixed(1));

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
            <p>yhteensä {totAnswers}</p>
            <p>keskiarvo {totAnswers > 0 ? average : noValuesYet}</p>
            <p>positiivisia {totAnswers > 0 ? `${percentPositive} %` : noValuesYet}</p>
        </div>
    )
}

export default App;