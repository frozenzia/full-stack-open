import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {

    if (message === null) return null
    // else
    return (
        <div className='error'>
            {message}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
}

Notification.defaultProps = {
    message: null,
}

export default Notification
