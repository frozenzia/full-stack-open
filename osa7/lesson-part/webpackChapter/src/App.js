import React, { useState } from "react"; // tarvitsemme importin nyt myös komponentin määrittelyn yhteydessä

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={() => setCounter(counter + 1)}>press</button>
    </div>
  );
};

export default App;
