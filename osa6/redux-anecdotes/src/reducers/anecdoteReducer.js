const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const initialState = anecdotesAtStart.map(asObject)

export const createAnecdote = (content) => ({
    type: 'NEW_ANECDOTE',
    data: {
        content,
        id: getId(),
        votes: 0
    }
})

export const voteForId = (id) => ({
    type: 'VOTE',
    data: { id }
})

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
    case 'NEW_ANECDOTE':
        return [...state, action.data]
    case 'VOTE': {
        const { id } = action.data
        const anecdoteToChangeIdx = state.findIndex(anecdote => anecdote.id === id)
        const changedAnecdote = {
            ...state[anecdoteToChangeIdx],
            votes: state[anecdoteToChangeIdx].votes + 1
        }

        return [
            ...state.slice(0, anecdoteToChangeIdx),
            changedAnecdote,
            ...state.slice(anecdoteToChangeIdx + 1)
        ].sort((a, b) => a.votes > b.votes ? -1 : 1)
    }
    default:
        return state
    }
}

export default reducer