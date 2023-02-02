import anecdoteReducer, { initialState } from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
    test('returns initial state when called with action anecdotes/notDefined', () => {
        const action = {
            type: 'anecdotes/notDefined',
        }

        const newState = anecdoteReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('returns new state with action anecdotes/createAnecdote', () => {
        const state = []
        const action = {
            type: 'anecdotes/createAnecdote',
            payload: 'the app state is in redux store'
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState.map(a => a.content)).toContainEqual(action.payload)
    })

    test('returns new state with action anecdotes/voteForId', () => {
        const state = [
            {
                content: 'the app state is in redux store',
                id: 1,
                votes: 0
            },
            {
                content: 'state changes are made with actions',
                id: 2,
                votes: 0
            }
        ]

        const action = {
            type: 'anecdotes/voteForId',
            payload: 2
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(2)

        expect(newState[1]).toEqual(state[0])

        expect(newState[0]).toEqual({
            content: 'state changes are made with actions',
            id: 2,
            votes: 1
        })
    })

})