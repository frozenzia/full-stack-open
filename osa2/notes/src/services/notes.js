import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    }
    return axios
        .get(baseUrl)
        .then(resp => resp.data.concat(nonExisting))
}

const create = newObject => {
    return axios
        .post(baseUrl, newObject)
        .then(resp => resp.data)
}

const update = (id, newObject) => {
    return axios
        .put(`${baseUrl}/${id}`, newObject)
        .then(resp => resp.data)
}

export default {
    getAll,
    create,
    update
}
