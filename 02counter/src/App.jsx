
import React from 'react';
import './App.css'

function App() {

  const [counter, setCounter] = React.useState(4)
  // let counter = 4

  function addValue() {
    // Callback is performed each time function is called, instead of batched when a plain variable
    // setCounter(counter + 1)
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
    setCounter((prevCounter) => prevCounter + 1)
  }

  const minusValue = () => {
    setCounter(counter - 1)
  }

  return (
    <>
      <h1>React Course With Vickerdent</h1>
      <h3>Counter Value: {counter} </h3>
      <button
        onClick={addValue}
      >Increase Value</button> {" "}
      <button onClick={minusValue} >Decrease Value</button>
      <p>Footer: {counter}</p>
    </>
  )
}

export default App
