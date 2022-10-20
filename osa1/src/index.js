import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Button from './Button'



const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.from(props.anecdotes, x => 0)); // [0, 0, ...] one zero for each item in anecdotes

    const handleVoteClick = () => {
        const tmpVotes = votes.map((vote, index) => {
            if (index !== selected) return vote;
            // else
            return vote + 1;
        });
        setVotes(tmpVotes);
    }

    const handleNextAnecdoteClick = () => {
        // get random number r
        const r = Math.floor(Math.random() * props.anecdotes.length);
        setSelected(r);
    }

    // sort votes in new array, last item is biggest, pop it, and then find the index in original array
    const indexWithMostVotes = votes.indexOf([...votes].sort().pop());

    return (
        <>
            <Header headerText='Anecdote of the day' />
            {props.anecdotes[selected]}<br />
            has {votes[selected]} votes<br />
            <Button text='vote' onClick={handleVoteClick} />
            <Button text='next anecdote' onClick={handleNextAnecdoteClick} />
            <Header headerText='Anecdote with the most votes' />
            {props.anecdotes[indexWithMostVotes]}<br />
            has {votes[indexWithMostVotes]} votes<br />
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.createRoot(document.getElementById('root')).render(<App anecdotes={anecdotes} />)