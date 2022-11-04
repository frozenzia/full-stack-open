import axios from 'axios'
// const baseUrl = 'http://localhost:5001/persons'
const baseUrl = 'api/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(resp => resp.data)
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

const destroy = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(() => {})
}

const service = { getAll, create, update, destroy };

export default service;
