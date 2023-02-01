import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'

const dispatch = useDispatch()

const AnecdoteForm = () => {
    const AddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }
    return <>
        <h2>create new</h2>
        <form onSubmit={AddAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    </>
}

export default AnecdoteForm