import { useState, useRef } from 'react';

export default function Player() {
  // ref will always have a current property with ref value
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  // const [submitted, setSubmitted] = useState(false);
  
  /* ref allow to get rid of this */
  // function handleChange(event) {
  //   setEnteredPlayerName(event.target.value);
  // }

  function handleClick() {
    setEnteredPlayerName(playerName.current.value)
    playerName.current.value = '';
  }

  return (
    <section id="player">
      {/* truthy ?? falsy */}
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input 
          ref={playerName} 
          type="text" 
          /* no longer needed with ref*/
          // onChange={handleChange} 
          // // ref.current.value
          // value={enteredPlayerName}
          />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
