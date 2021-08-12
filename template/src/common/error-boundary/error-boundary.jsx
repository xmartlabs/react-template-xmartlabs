import React from 'react';
import PropTypes from 'prop-types';

import { logger } from 'helpers/logger';
import { UnexpectedError } from 'pages/unexpected-error';

const IPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};
/*
  NOTE: remember that error boundaries do not catch
  all kinds of errors: https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
*/
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    // Catch unhandled Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      // Unhandled rejections do not necessarily indicate a crash
      // of the whole application, so there's no immediate need
      // to show a fallback UI.
      logger.warn(`Unhandled Promise rejection: ${event.reason}`);
      logger.error(event.reason);
    });
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    logger.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <UnexpectedError />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = IPropTypes;

export { ErrorBoundary };
