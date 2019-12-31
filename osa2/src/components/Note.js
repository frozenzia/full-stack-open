import React from 'react';
import PropTypes from 'prop-types';

const Note = ({ note }) => <li>{note.content}</li>;

Note.propTypes = {
    note: PropTypes.shape({
        content: PropTypes.string.isRequired,
    }).isRequired,
};

export default Note;
