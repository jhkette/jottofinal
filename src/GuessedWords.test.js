import { shallow } from "enzyme";
import React from 'react'
import { findByTestAttr, checkProps } from "../test/testUtils";

import GuessedWords from "./GuessedWords";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
};
/**
 * Factory function to create a shallow wrapper for the app component
 * @function setup
 * @param {object} props
 * @returns {wrapper} - wrapper of guessed words components
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test('does not throw warning with expected props',() => {
  checkProps(GuessedWords, defaultProps)
})
// describe is a way of grouping tests
describe('if there are no words guessed', () => {
  // declaring it here so scope is present for whole describe function
  let wrapper
  // before each runs before each test. here we setup the wrapper with the guessedwords prop
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });
  // renders 'component-guessed-words'
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  // renders guess-instructions
  test('renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });
  test ('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });
  
  test('correct number of guessed words', () => {
    // find nodes by using findByTestAttr
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
    // then expect the length to be guessedWords.length)
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});