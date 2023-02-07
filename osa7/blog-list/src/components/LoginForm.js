import PropTypes from "prop-types";

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => (
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
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
