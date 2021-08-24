// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/*
  NOTE: overriding console methods is not a very good practice,
  but it's the only way we have of testing PropType validation in React.

  There's a discussion about this here (non-conclusive): https://github.com/facebook/prop-types/issues/28
*/
/* eslint-disable-next-line no-console */
const originalConsoleError = console.error;
/* eslint-disable-next-line no-console */
console.error = (...messages) => {
  // NOTE: PropTypes uses string formatting to log their messages to console.
  // That's why this next Regexp is like it is.
  if (/(Failed %s type: %s%s)/.test(messages.toString())) {
    const errorMessage = `PropType failure: ${messages[2]}`;
    throw new Error(errorMessage);
  } else {
    originalConsoleError(...messages);
  }
};
