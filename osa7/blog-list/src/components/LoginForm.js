import PropTypes from "prop-types";
import { TextField } from "@mui/material";

import OwnButton from "./OwnButton";

const LoginForm = ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
}) => (
    <form onSubmit={handleLogin}>
        <div>
            <TextField
                label="username"
                value={username}
                name="Username"
                onChange={({ target }) => handleUsernameChange(target.value)}
            />
        </div>
        <div>
            <TextField
                type="password"
                label="password"
                value={password}
                name="Password"
                onChange={({ target }) => handlePasswordChange(target.value)}
            />
        </div>
        <OwnButton variant="contained" color="primary" type="submit">
            login
        </OwnButton>
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
