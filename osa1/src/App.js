import React, { useState } from 'react';

import Button from './Button';
import strings, { getVoteString } from './strings';
import Otsikko from './Otsikko';

const App = () => {
    const [state, setState] = useState({
        selected: 0,
        votes: [],
        mostVotes: null,
    });

    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ];

    const pickRandomQuote = () => {
        // Just pick random number between 0 and the last index of
        // anecdotes array, then set state.selected to that value.
        const randomNbr = Math.floor(Math.random() * Math.floor(anecdotes.length - 1));
        setState({ ...state, selected: randomNbr });
    };

    const increaseVote = () => {
        const currentAnecdote = state.selected;
        const newVotes = [...state.votes];
        if (!newVotes[currentAnecdote]) newVotes[currentAnecdote] = 1; // 1st vote
        else newVotes[currentAnecdote] += 1;

        const onlyRealVotes = newVotes.filter((elem) =>
            (typeof elem === 'number')
        );
        const newMax = Math.max(...onlyRealVotes);
        const mostVotes = newVotes.findIndex((item) => {
            return item === newMax;
        });

        setState({
            ...state,
            votes: newVotes,
            mostVotes,
        });
    }

    let votes = state.votes[state.selected];
    if (!votes) votes = 0;

    let mostVotesResults = null;
    if (state.mostVotes !== null) mostVotesResults = (
        <div>
            {anecdotes[state.mostVotes]}<br />
            {getVoteString(state.votes[state.mostVotes])}
        </div>
    );

    return (
        <div>
            {anecdotes[state.selected]}<br />
            {getVoteString(votes)}<br />
            <Button
                handleClick={increaseVote}
                text={strings.labels.vote}
            />
            <Button
                handleClick={pickRandomQuote}
                text={strings.labels.pickQuote}
            />
            <Otsikko text={strings.headers.mostVotes} />
            {mostVotesResults}
        </div>
    );
}

export default App;