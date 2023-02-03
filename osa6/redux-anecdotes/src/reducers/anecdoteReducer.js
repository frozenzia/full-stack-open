import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        // dispatch(createAnecdote({ content: 'hej', votes: 0, id: 123 }))
        createAnecdote(state, { payload }) { // type = 'anecdotes/createAnecdote'
            state.push(payload)
        },
        // dispatch(voteForId(3))
        voteForId(state, action) { // type = 'anecdotes/voteForId', payload = 3
            const { payload: id } = action
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
        },
        // dispatch(setAnecdotes([<anec1>, <anec2>, ...]))
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { createAnecdote, setAnecdotes, voteForId } = anecdoteSlice.actions

export default anecdoteSlice.reducer