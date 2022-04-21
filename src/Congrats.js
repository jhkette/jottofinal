import React from 'react'
import PropTypes from 'prop-types';
/**
 * @function
 * @param {object} props
 * @returns jsx.element
 */

export default function Congrats(props) {
  if (props.success){ return ( 
    <div data-test="component-congrats" className="alert alert-success">
     <span  data-test="congrats-message">
       congratulations! You guessed the word
     </span>
    </div> 
  )
  }else{
    return (
      <div data-test="component-congrats" />
    )
  }
  }

  Congrats.propTypes = {
    success: PropTypes.bool.isRequired,
  };