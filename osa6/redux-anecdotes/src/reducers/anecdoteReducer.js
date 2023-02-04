import { createSlice } from '@reduxjs/toolkit'

import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        // dispatch(appendAnecdote({ content: 'haa', votes: 0, id: 123 }))
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        // dispatch(replaceAnecdote({ content: 'haa', votes: 1, id: 123 }))
        replaceAnecdote(state, action) {
            const anecdoteToChangeIdx = state.findIndex(anecdote => anecdote.id === action.payload.id)
            return [
                ...state.slice(0, anecdoteToChangeIdx),
                action.payload,
                ...state.slice(anecdoteToChangeIdx + 1)
            ].sort((a, b) => a.votes > b.votes ? -1 : 1)
        },
        // dispatch(setAnecdotes([<anec1>, <anec2>, ...]))
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { appendAnecdote, replaceAnecdote, setAnecdotes } = anecdoteSlice.actions

// dispatch(initializeAnecdotes())
export const initializeAnecdotes = () => {
    return async (dispatch /*, getState */) => {
        anecdotesService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }
}

// dispatch(createAnecdote('huu'))
export const createAnecdote = (content) => {
    return async (dispatch /*, getState */) => {
        const newAnecdote = await anecdotesService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

// dispatch(voteForId(4)) -- where 4 = ID!!
export const voteForId = (id) => {
    return async (dispatch, getState) => {
        const state = getState().anecdotes
        const anecdoteToChange = state.find(anecdote => anecdote.id === id)
        const changedAnecdote = {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1
        }
        // All this is doing is updating the DATABASE -- it isn't actually
        // updating the STORE as far as I can tell. So we still need to update the STORE,
        // (with the new vote count, PLUS SORT the STORE)
        anecdotesService.update(id, changedAnecdote).then(() => {
            dispatch(replaceAnecdote(changedAnecdote))
        })
    }
}




export default anecdoteSlice.reducer