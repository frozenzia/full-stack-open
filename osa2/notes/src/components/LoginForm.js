import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text)
    }

    const handleLoginInt = (event) => {
        event.preventDefault()
        handleLogin(username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLoginInt}>
            <div>
        username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => handleUsernameChange(target.value)}
                />
            </div>
            <div>
        password
                <input
                    type="text"
                    value={password}
                    name="Password"
                    onChange={({ target }) => handlePasswordChange(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
