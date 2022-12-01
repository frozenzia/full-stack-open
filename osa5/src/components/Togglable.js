import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'

const theBeef = ({ buttonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })

    return <>
        <div className={!visible ? 'showMe' : 'hideMe'}>
            <button onClick={toggleVisible}>{buttonLabel}</button>
        </div>
        <div className={visible ? 'showMe' : 'hideMe'}>
            {children}
            <button onClick={toggleVisible}>cancel</button>
        </div>
    </>
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

const Togglable = forwardRef(theBeef)

export default Togglable