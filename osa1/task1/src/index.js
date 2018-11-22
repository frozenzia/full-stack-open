import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Button from './Button';
import Otsikko from './Otsikko';
import Statistics from './Statistics';
import strings from './strings';

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
                <Otsikko text={strings.headers.giveFeedback} />
                <Button text={strings.labels.good} handleClick={() => {
                    this.addOne('good');
                }} />
                <Button text={strings.labels.neutral} handleClick={() => {
                    this.addOne('neutral');
                }} />
                <Button text={strings.labels.bad} handleClick={() => {
                    this.addOne('bad');
                }} />
                <Statistics feedback={this.state} />
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
