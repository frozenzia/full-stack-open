import React from 'react'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => (
    <form onSubmit={handleLogin}>
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

export default LoginForm
