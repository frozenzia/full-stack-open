import axios from 'axios'

const baseURL = 'http://localhost:5001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseURL).then(res => res.data)

export const createAnecdote = (anecdote) =>
    axios.post(baseURL, anecdote).then(res => res.data)

export const updateAnecdote = updatedAnecdote =>
    axios.put(`${baseURL}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)