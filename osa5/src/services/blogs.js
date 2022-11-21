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
        headers: { authorization: token },
    }
    console.log('got to create...')
    const resp = await axios.post(baseUrl, newObject, config)
    return resp.data
}

export default { setToken, getAll, create }
