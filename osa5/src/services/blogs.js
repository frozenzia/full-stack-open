import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

const create = async newObject => {
    const config = {
        headers: { authorization: token }
    }
    const resp = await axios.post(baseUrl, newObject, config)
    return resp.data
}

const update = async updatedObject => {
    const config = {
        headers: { authorization: token }
    }
    const resp = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
    return resp.data
}

export default { setToken, getAll, create, update }
