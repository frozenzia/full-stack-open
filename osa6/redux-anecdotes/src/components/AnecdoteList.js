import { useSelector, useDispatch } from 'react-redux'

import { voteForId } from '../reducers/anecdoteReducer'

const anecdotes = useSelector(state => state)
const dispatch = useDispatch()

const vote = (id) => {
    dispatch(voteForId(id))
}

const AnecdoteList = () => {


    return anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

export default AnecdoteList