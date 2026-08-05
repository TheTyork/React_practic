import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  function dicrement() {
    setCounter(counter - 1);
  }

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={increment}>+1</button>
      <button onClick={dicrement}>-1</button>
    </div>
  );
};

export default Counter;
