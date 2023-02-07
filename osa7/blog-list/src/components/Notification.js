import PropTypes from "prop-types";

const Notification = ({ message, succeeded }) => {
    if (message === null) return null;
    // else
    return (
        <div className={succeeded ? "notice" : "notice fail"}>{message}</div>
    );
};

Notification.propTypes = {
    message: PropTypes.string,
    succeeded: PropTypes.bool,
};

Notification.defaultProps = {
    message: null,
    succeeded: true,
};

export default Notification;
