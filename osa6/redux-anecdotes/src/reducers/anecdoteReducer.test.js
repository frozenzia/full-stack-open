import anecdoteReducer, { initialState } from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
    test('returns initial state when called with action NO_ACTION', () => {
        const action = {
            type: 'NO_ACTION',
        }

        const newState = anecdoteReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    test('returns new state with action NEW_ANECDOTE', () => {
        const state = []
        const action = {
            type: 'NEW_ANECDOTE',
            data: {
                content: 'the app state is in redux store',
                id: 1,
                votes: 0,
            }
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })

    test('returns new state with action VOTE', () => {
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
            type: 'VOTE',
            data: {
                id: 2
            }
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