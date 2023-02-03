import axios from 'axios'
const baseUrl = 'http://localhost:5001/notes'
// const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }


const createNew = async (content) => {
    const object = { content, important: false }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = (id, newObject) => {
    return axios
        .put(`${baseUrl}/${id}`, newObject)
        .then(resp => resp.data)
}

const notesService = {
    setToken,
    getAll,
    createNew,
    update
}

export default notesService