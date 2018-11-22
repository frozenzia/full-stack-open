import React from 'react';
import ReactDOM from 'react-dom';

import Button from './Button';
import strings from './strings';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }
    }
    pickRandomQuote = () => {
        // Just pick random number between 0 and the last index of
        // anecdotes array, then set this.state.selected to that value.
        const randomNbr = Math.floor(Math.random() * Math.floor(anecdotes.length - 1));
        this.setState({ selected: randomNbr });
    }

    render() {
        return (
            <div>
            {this.props.anecdotes[this.state.selected]}<br />
            <Button handleClick={this.pickRandomQuote} text={strings.labels.pickQuote} />
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
