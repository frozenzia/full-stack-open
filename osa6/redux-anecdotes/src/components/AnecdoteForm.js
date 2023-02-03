import { useDispatch } from 'react-redux'

import anecdotesService from '../services/anecdotes'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const AddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdotesService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`You added: "${content}"`))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)
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