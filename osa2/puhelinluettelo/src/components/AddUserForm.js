import React from 'react';
import PropTypes from 'prop-types';

const AddUserForm = (props) => {
    const { onSubmit, nameString, onNameChange, nameInputRef, phoneString, onPhoneChange } = props;
    return (

            <form onSubmit={onSubmit}>
                <div>
                    name:   <input
                                autoFocus
                                value={nameString}
                                onChange={onNameChange}
                                ref={nameInputRef}
                            />
                </div>
                <div>
                    number: <input
                                value={phoneString}
                                onChange={onPhoneChange}
                            />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

    );
};

AddUserForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    nameString: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired,
    nameInputRef: PropTypes.shape({}).isRequired,
    phoneString: PropTypes.string.isRequired,
    onPhoneChange: PropTypes.func.isRequired,
};

export default AddUserForm;
