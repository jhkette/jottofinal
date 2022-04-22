import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";


/* 
These are functional tests - that test the whole app and user flow in the app.
They are not unit test where you test one particular component. we are testing the whole app. hence the reason
we are mounting the whole app using the mount function
*/ 
/**
 * @function setup
 * @param {object} state - Initial conditions.
 * @returns {Wrapper} - Enzyme wrapper of mounted App component
 */
const setup = (state = {}) => {
// mount app - A method that re-mounts the component, if it is not currently mounted
// we are using mount as we are mounting the WHOLE app - this is not unit testing 
// where we test one unit of the application - we want to to do some functional testing of the whole app
  const wrapper = mount(<App />);
  // find inputBox
  const inputBox = findByTestAttr(wrapper, "input-box");
  // simulate 'change' add target with value 'train'
  inputBox.simulate("change", { target: { value: "train" } });
  // find submit button
  const submitButton = findByTestAttr(wrapper, "submit-button");
  // this simulates a click - we need to add prevent default function here
  submitButton.simulate("click", { preventDefault() {} });

  return wrapper;
};

describe.skip("no words guessed", () => {
  // scope wrapper within describe  
  let wrapper;
  // beforeach sets up wrapper with appropriate arguments   
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [],
    });
  });
  // guessedword  needs to have length of one - as we are already simulating chnage with 'train' in setup
  test("creates GuessedWords table with one row", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes.length).toHaveLength(1);
  });
});

// essentially the same as now words guessed except guessedWordNodes should be 2
describe.skip("some words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });
  });
  test("creates GuessedWords table with one row", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(2);
  });
});


describe.skip("guess secret word", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    });

    // add value to input box
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "party" } };
    inputBox.simulate("change", mockEvent);

    // simulate click on submit button
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });
  // guessedwords now need to be three
  test("adds row to guessedWords table", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes).toHaveLength(3);
  });
  // should display congrats component
  test("displays congrats component", () => {
    const congrats = findByTestAttr(wrapper, "component-congrats");
    expect(congrats.text().length).toBeGreaterThan(0);
  });
  // should not display input component 
  test("does not display input component contents", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    expect(inputBox.exists()).toBe(false);

    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.exists()).toBe(false);
  });
});
