import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";

const setup = (success=false, secretWord = "party") => {
  // const setupProps = { ...defaultProps, ...props };
  return shallow(<Input success={success} secretWord={secretWord} />);
};

// // mock function that jest watches
// const mockSetCurrentGuesss = jest.fn();

/* There is a way of destructuring usestae in component pages by using code below*/
// // use jest formal mocking of react module
// // we are doing it this way as we are destructuring 'use state' in input.js
// // you could just do functional tests rather than unit tests - ie skip this and concentrate on effects of functiona
// // changes
// jest.mock('react', () => ({

//     ...jest.requireActual('react'),
//     // overwrite usestate property. takes state and return an array of initialsate and mocksetcurrentguess
//     // it will always return mockSetCurrentGuess as that second value of the array
//     useState: (initialState) => [initialState, mockSetCurrentGuesss]
// }))

/***  
 * tests for ui if there is a fale/true success value 
 * **/
describe('render', () => {
    describe('success is false', () => {
    //   scope wrapper here
      let wrapper; 
    //   setup wrapper with value
      beforeEach(() => {
        //   add false value for 'success'
        wrapper = setup(false );
      })
    //   expect there to be a component-input
      test('Input renders without error', () => {
        const inputComponent = findByTestAttr(wrapper, 'component-input');
        expect(inputComponent.length).toBe(1);
      });
    // expect there to be a component-input
      test('input box displays', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        expect(inputBox.exists()).toBe(true);
      });
    //  expect there to be a submit button
      test('submit button displays', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.exists()).toBe(true);
      });
    });
    describe('success is true', () => {
        // put wrapper in scope of all describe function
      let wrapper;
      beforeEach(() => {
        //   add parameter 'true' for success
        wrapper = setup(true );
      })
      test('Input renders without error', () => {
        const inputComponent = findByTestAttr(wrapper, 'component-input');
        expect(inputComponent.length).toBe(1);
      });
    //   the input box should not appear
      test('input box does not display', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        expect(inputBox.exists()).toBe(false);
      });
    //   the submit button should not appear
      test('submit button does not display', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.exists()).toBe(false);
      });
    });
  });

// check to see that no warning is thrown if correct props are added - ie
// secretparty needs to be a string
test("does not throw warning with expected props ", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input", () => {
  // mock function that jest watches
  let mockSetCurrentGuess = jest.fn();
  // scope wrapper here so it is accessible
  let wrapper;
  let originalUseState;

  // run beforeeach before each before each test to avoid replicating code
  beforeEach(() => {
    // clear mocksetcurrentguess - so it's not taking the results of the test with it
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = () => ["", mockSetCurrentGuess];
    wrapper = setup(false);
  });
  afterEach(() => {
    React.useState = originalUseState;
  });
  test("state updates with value of input on change", () => {
    // find input box
    const inputBox = findByTestAttr(wrapper, "input-box");
    // create a mockevent that has a target value of train
    const mockEvent = { target: { value: "train" } };
    // simulates input box getting a value of train
    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("field is cleared upon submit button click", () => {
    // find submit button
    const submitButton = findByTestAttr(wrapper, "submit-button");
     // we sinmulate click but we need to add an object with the preventDefault with a function as a value
    submitButton.simulate("click", { preventDefault: () => {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
