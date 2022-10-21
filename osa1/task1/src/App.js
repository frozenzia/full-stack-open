import React, { Component } from 'react';

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
            </div>
        )
    }
}

export default App;