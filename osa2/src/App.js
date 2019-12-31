import React from 'react';
import PropTypes from 'prop-types';

import Note from './components/Note';

const App = ({ notes }) => {
    const noteRows = notes.map(note => <Note key={note.id} note={note} />);

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {noteRows}
            </ul>
        </div>
    )
}

App.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
    })).isRequired,
};

export default App;
