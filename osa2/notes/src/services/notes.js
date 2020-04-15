import axios from 'axios'
// const baseUrl = 'https://ancient-ocean-58745.herokuapp.com/notes'
const baseUrl = '/api/notes'

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(resp => resp.data)
}

const create = newObject => {
  const config = {
    headers: { authorization: token },
  };

  return axios
    .post(baseUrl, newObject, config)
    .then(resp => resp.data)
}

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(resp => resp.data)
}

export default {
    setToken,
    getAll,
    create,
    update
}
