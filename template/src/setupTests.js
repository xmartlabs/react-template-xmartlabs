// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/*
  NOTE: overriding console methods is not a very good practice,
  but it's the only way we have of testing PropType validation in React.

  There's a discussion about this here (non-conclusive): https://github.com/facebook/prop-types/issues/28
*/
/* eslint-disable-next-line no-console */
const originalConsoleError = console.error;
/* eslint-disable-next-line no-console */
console.error = (...messages) => {
  if (/(Failed prop type)/.test(...messages)) {
    throw new Error(messages[0]);
  }
  originalConsoleError(...messages);
};
