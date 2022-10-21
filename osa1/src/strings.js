const strings = {
    labels: {
        pickQuote: 'next anecdote',
        vote: 'vote',
    },
    headers: {
        mostVotes: 'anecdote with most votes'
    },
    misc: {
        hasVotes1: 'has ',
        hasVotes2: ' votes',
        hasVote: ' vote',
    },
};

export const getVoteString = (num) => {
    if (num !== 1) return strings.misc.hasVotes1+num+strings.misc.hasVotes2;
    return strings.misc.hasVotes1+num+strings.misc.hasVote;
};

export default strings;
