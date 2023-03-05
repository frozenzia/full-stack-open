import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle, useState } from "react";

import OwnButton from "./OwnButton";

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => setVisible(!visible);

    useImperativeHandle(ref, () => {
        return {
            toggleVisible,
        };
    });

    return (
        <>
            <div className={!visible ? "showMe" : "hideMe"}>
                <OwnButton onClick={toggleVisible}>{buttonLabel}</OwnButton>
            </div>
            <div className={visible ? "showMe" : "hideMe"}>
                {children}
                <OwnButton onClick={toggleVisible}>cancel</OwnButton>
            </div>
        </>
    );
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
