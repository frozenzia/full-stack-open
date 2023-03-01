import axios from "axios";
import React, { useEffect, useState } from "react"; // tarvitsemme importin nyt myös komponentin määrittelyn yhteydessä

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setValues(values.concat(counter));
    setCounter(counter + 1);
  };

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  );
};

export default App;
