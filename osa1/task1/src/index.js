import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Button from './Button';
import Otsikko from './Otsikko';

const giveFeedback = 'Anna palautetta';
const stats = 'statistiikka';
const good = 'hyvä';
const neutral = 'neutraali';
const bad = 'huono';

class App extends Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0,
    };

    addOne = (option) => {
        this.setState((prevState) => {
            return { [option]: prevState[option] += 1 };
        });
    };

    render() {
        const noValuesYet = 'ei vielä palautetta';
        const totAnswers = (Object.values(this.state)).reduce((accum, val) => accum + val, 0);
        const average = parseFloat(((this.state.good*1 - this.state.bad*1) / totAnswers).toFixed(1));
        const percentPositive = parseFloat(((this.state.good / totAnswers) * 100).toFixed(1));

        return (
            <div>
                <Otsikko text={giveFeedback} />
                <Button text={good} handleClick={() => {
                    this.addOne('good');
                }} />
                <Button text={neutral} handleClick={() => {
                    this.addOne('neutral');
                }} />
                <Button text={bad} handleClick={() => {
                    this.addOne('bad');
                }} />
                <Otsikko text={stats} />
                <p>{good} {this.state.good}</p>
                <p>{neutral} {this.state.neutral}</p>
                <p>{bad} {this.state.bad}</p>
                <p>keskiarvo {totAnswers > 0 ? average : noValuesYet}</p>
                <p>positiivisia {totAnswers > 0 ? `${percentPositive} %` : noValuesYet}</p>
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
