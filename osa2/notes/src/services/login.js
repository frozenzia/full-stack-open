import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const resp = await axios.post(baseUrl, credentials)
    return resp.data
}

const loginService = { login }
export default loginService
