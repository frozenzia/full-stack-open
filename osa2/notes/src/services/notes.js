import axios from 'axios'
// const baseUrl = 'https://ancient-ocean-58745.herokuapp.com/notes'
const baseUrl = '/api/notes'

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

const service = {
    getAll,
    create,
    update
};

export default service;
