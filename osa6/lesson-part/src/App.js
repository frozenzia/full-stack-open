import './App.css';

import constants from './constants'

function App({ store }) {
  return (
    <div className="App">
      <div id='number'>{store.getState()}</div>
      <div>
        {Object.keys(constants.ACTIONS).map((aKey) => (
          <button key={aKey} onClick={() => store.dispatch({ type: aKey })}>
            {aKey.toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
