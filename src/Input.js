import React from 'react';
import PropTypes from 'prop-types';

function Input({  success, secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState("");
  
  // return early if success == true
  // and just return the div data test component input
  if (success) {
    return <div data-test='component-input' />
  }


  return (
    <div data-test='component-input'>
      <form className="form-inline">
        {/* set current guess to target value */}
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          onClick={(evt) => {
            evt.preventDefault();
            // TODO: update guessedWords
            // TODO: check against secretWord and update success if necessary
            setCurrentGuess("");
          }}
          className="btn btn-primary mb-2"
        >
        Submit
        </button>
      </form>
    </div>
  );
}



export default Input;