import React from "react";

/**
 * Functional react component for congratulatory message
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} -renders component  */

export default function Congrats(props) {
  if (props.success)
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    );
  else {
    return <div data-test="component-congrats" />;
  }
}