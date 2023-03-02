import { useSelector, useDispatch } from 'react-redux'

import { voteForId } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = (id, content) => {
        dispatch(voteForId(id))
        dispatch(setNotification(`You voted for: "${content}"`, 3))
    }

    return anecdotes.filter(a => a.content.includes(filter)).map(anecdote =>
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