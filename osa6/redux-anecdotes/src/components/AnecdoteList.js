import { useSelector, useDispatch } from 'react-redux'

import { voteForId } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(voteForId(id))
        dispatch(setNotification(`You voted for: "${content}"`))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)

    }

    return anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
        </div>
    )
}

export default AnecdoteList